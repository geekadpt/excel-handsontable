<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Requests\Api\UserRequest;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Api\AuthorizationRequest;
use App\Http\Requests\Api\SocialAuthorizationRequest;
use Illuminate\Support\Arr;

class UsersController extends Controller
{
    public function store(UserRequest $request)
    {
        $verifyData = \Cache::get($request->verification_key);

        if (!$verifyData) {
            abort(403, '验证码已失效');
        }

        if (!hash_equals($verifyData['code'], $request->verification_code)) {
            // 返回401
            throw new AuthenticationException('验证码错误');
        }

        $user = User::create([
            'name' => $request->name,
            'phone' => $verifyData['phone'],
            'password' =>  Hash::make($request->password),
        ]);

        // 清除验证码缓存
        \Cache::forget($request->verification_key);

        return new UserResource($user);
    }
    public function login(AuthorizationRequest $request)
    {
        $username = $request->username;

        filter_var($username, FILTER_VALIDATE_EMAIL) ?
            $credentials['email'] = $username :
            $credentials['phone'] = $username;

        $credentials['password'] = $request->password;

        if (!$token = \Auth::guard('api')->attempt($credentials)) {
            throw new AuthenticationException('用户名或密码错误');
        }

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => \Auth::guard('api')->factory()->getTTL() * 60
        ])->setStatusCode(201);
    }
    //第三方登陆
    public function socialStore($type, SocialAuthorizationRequest $request)
    {
        $driver = \Socialite::driver($type);

        try {
                $code = $request->code;
                $response = $driver->getAccessTokenResponse($code);
                $token = Arr::get($response, 'access_token');
                $oauthUser = $driver->userFromToken($token);
        } catch (\Exception $e) {
            throw new AuthenticationException('参数错误，未获取用户信息');
        }

        // 在本地 users 表中查询该用户来判断是否已存在
        $user = User::where( 'provider_id', '=', $oauthUser->id )
            ->where( 'provider', '=', $type )
            ->first();
        if ($user == null) {
            // 如果该用户不存在则将其保存到 users 表
            $newUser = new User();

            $newUser->name        = $type=='weibo'?$oauthUser->getNickname():$oauthUser->getName();
            $oauthUserEmail = $oauthUser->getEmail() ;
            if($oauthUserEmail !== ''){
                User::where('email',$oauthUserEmail)->doesntExist() ? $newUser->email = $oauthUserEmail:$newUser->email = null;
            }else{
                $newUser->email = '';
            }
            $newUser->avatar      = $oauthUser->getAvatar();
            $newUser->password    = '';
            $newUser->provider    = $type;
            $newUser->provider_id = $oauthUser->getId();

            $newUser->save();
            $user = $newUser;
        }
        $token = \Auth::guard('api')->fromUser($user);
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => \Auth::guard('api')->factory()->getTTL() * 60
        ])->setStatusCode(201);
    }

}
