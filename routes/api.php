<?php

use Illuminate\Http\Request;

//不需要登录可以访问的接口
//路由前缀
Route::prefix('v1')
    //命名空间
    ->namespace('Api')
    //别名
    ->name('api.v1.')
    //路由组
    ->group(function () {
        Route::get('version', function() {
            return 'this is version v1';
        })->name('version');
        // 短信验证码
        Route::post('verificationCodes', 'VerificationCodesController@store')
            ->name('verificationCodes.store');
        // 用户注册
        Route::post('users', 'UsersController@store')
            ->name('users.store');
        // 登录
        Route::post('authorizations', 'UsersController@login')
            ->name('api.authorizations.login');
        // 第三方登录
        Route::post('socials/{social_type}/authorizations', 'UsersController@socialStore')
            ->where('social_type', 'weibo|github')
            ->name('socials.authorizations.store');
        //获取某个用户详情
        Route::get('users/{user}', 'UsersController@show')
            ->name('users.show');
        // 登录后才可以访问的接口
        Route::middleware('auth:api')->group(function() {
            // 当前登录用户信息
            Route::get('user', 'UsersController@me')
                ->name('user.me');
        });
    });

