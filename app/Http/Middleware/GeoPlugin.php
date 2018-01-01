<?php

namespace App\Http\Middleware;

use Closure;
use View;
use GeoIP;

class GeoPlugin
{
    public function handle($request, Closure $next, $guard = null)
    {
        $geoData = $request->session()->get('geoData');

        if ( ! $geoData ) {
            $ip = $_SERVER['REMOTE_ADDR'];
            $details = GeoIP::getLocation($ip);
            $request->session()->put('geoData', $details);
        }

        View::composer('*', function($view) use ($geoData) {
            View::share('geoData', $geoData);
        });

        return $next($request);
    }
}
