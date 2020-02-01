<?php

use Illuminate\Http\Request;

Route::prefix('v1')
    ->namespace('Api')
    ->name('api.v1.')
    ->group(function () {
        Route::get('version', function() {
            return 'this is version v1';
        })->name('version');
    });