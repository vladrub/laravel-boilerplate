<?php

namespace App\Http\Middleware;

use OAuth\Common\Storage\Session;
use Closure;
use App\User;
use Auth;

class GetUserFromToken
{
    private $user;

    public function handle($request, Closure $next)
    {
        $this->user = Auth::user();

        if ( $this->user ) {
            $request->attributes->add(['user' => $this->user]);
            return $next($request);
        }

        $storage = new Session();
        $token = '';

        if ( $storage->hasAccessToken('Vkontakte') ) {
            $token = $storage->retrieveAccessToken('Vkontakte')->getAccessToken();
        } else if ( $storage->hasAccessToken('Facebook') ) {
            $token = $storage->retrieveAccessToken('Facebook')->getAccessToken();
        } else if ( $storage->hasAccessToken('Odnoklassniki') ) {
            $token = $storage->retrieveAccessToken('Odnoklassniki')->getAccessToken();
        }

        if ( $token ) {
            $this->user = User::where(['accessToken' => $token])->first();
        } else {
            $this->user = false;
        }

        $request->attributes->add(['user' => $this->user]);
        return $next($request);
    }
}
