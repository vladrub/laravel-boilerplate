<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\Redirect;
use Closure;

class Connect
{
    private $user;

    public function handle($request, Closure $next, $guard = null)
    {
        $this->user = $user = $request->get('user');

        if ( $this->user ) {
        } else {
            return redirect('/');
        }

        return $next($request);
    }
}
