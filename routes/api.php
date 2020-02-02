<?php

use Illuminate\Http\Request;

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
    });
