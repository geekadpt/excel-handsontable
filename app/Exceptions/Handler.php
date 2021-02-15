<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Exception
     */
    public function render($request, Exception $exception)
    {
        if ($this->isHttpException($exception)) {
//            if (view()->exists('errors.' . $exception->getStatusCode())) {
//                API服务器不需要返回视图
//                return response()->view('errors.' . $exception->getStatusCode(), [], $exception->getStatusCode());
//            }
            //404已交给Vue处理,这里返回视图即可;
            if($exception->getStatusCode()==404 && $request->method()=='GET'){
                if(request()->segment(1) !== 'api')
                    return response()->view('app');
            }
        }
        return parent::render($request, $exception);
    }
}
