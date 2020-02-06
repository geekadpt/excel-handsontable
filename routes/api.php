<?php

use Illuminate\Http\Request;

//路由前缀
Route::prefix('v1')
    //命名空间
    ->namespace('Api')
    //别名
    ->name('api.v1.')
    //中间件
    ->middleware('change-locale')
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
        // 获取分享的表格
        Route::get('share/{table}', 'TablesController@showShare')
            ->name('share.show');

        // 登录后才可以访问的接口
        Route::middleware('auth:api')->group(function() {
            // 当前登录用户信息
            Route::get('user', 'UsersController@me')
                ->name('user.me');
            // 编辑登录用户信息
            Route::patch('user', 'UsersController@update')
                ->name('user.update');
            // 表格集合资源
            Route::resource('tables', 'TablesController')->only([
                'index','show','store', 'update', 'destroy'
            ]);
            // 回收站
            Route::get('trash', 'TablesController@trashIndex')
                ->name('trash.show');
            // 删除回收站某个文件
            Route::delete('trash/{trash}', 'TablesController@trashDelete')
                ->name('trash.trash.delete');
            // 清空回收站
            Route::post('trash', 'TablesController@trashDeleteAll')
                ->name('trash.trash.delete.all');
            // 恢复回收站某个文件
            Route::patch('trash/{trash}', 'TablesController@trashRestore')
                ->name('trash.trash.restore');

            // 表格分享
            Route::post('share/{table}', 'TablesController@switchShare')
                ->name('share.switch');

            // 搜索表格
            Route::post('search', 'TablesController@searchSheet')
                ->name('sheet.search');
        });
    });

