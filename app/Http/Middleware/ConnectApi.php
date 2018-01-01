<?php

namespace App\Http\Middleware;

use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Closure;

class ConnectApi
{
    private $user;

    public function handle($request, Closure $next, $guard = null)
    {
        $this->user = $user = $request->get('user');

        if ( $this->user ) {
        } else {
            throw new AccessDeniedHttpException();
        }

        return $next($request);
    }
}