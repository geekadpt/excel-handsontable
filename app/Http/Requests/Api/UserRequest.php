<?php

namespace App\Http\Requests\Api;

class UserRequest extends FormRequest
{
    public function rules()
    {
        switch($this->method()) {
            case 'POST':
                return [
                    'name' => 'required|between:3,25|regex:/^[A-Za-z0-9\-\_]+$/',
                    'password' => 'required|alpha_dash|min:6',
                    'verification_key' => 'required|string',
                    'verification_code' => 'required|string',
                ];
                break;
            case 'PATCH':
                return [
                    'name' => 'between:3,25|regex:/^[A-Za-z0-9\-\_]+$/',
                    'password_origin' => 'required|alpha_dash|min:6',
                    'password' => 'required|alpha_dash|min:6',
                    'introduction' => 'string|max:80',
                ];
                break;
        }

    }

    public function attributes()
    {
        return [
            'verification_key' => '短信验证码 key',
            'verification_code' => '短信验证码',
        ];
    }
}