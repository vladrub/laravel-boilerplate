<?php

use Jenssegers\Agent\Agent;
use App\Country;
use App\Banner;
use App\Hero;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

// SITE

Route::group(['domain' => env('APP_DOMAIN')], function() {
    Route::get('/', 'IndexController@index');

    Route::post('connect/login', 'ConnectController@login');
    Route::post('connect/registration', 'ConnectController@registration');
    Route::get('connect/vkontakte', 'ConnectController@loginWithVKontakte');
    Route::get('connect/facebook', 'ConnectController@loginWithFacebook');
    Route::get('connect/odnoklassniki', 'ConnectController@loginWithOdnoklassniki');
    Route::get('connect/logout', 'ConnectController@logout');
});

// HELPERS
View::composer('*', function($view){
    $agent = new Agent();

    View::share('isMobile', $agent->isMobile());
    View::share('view_name', str_replace('.', '-', $view->getName()));

    View::share('loginStatus', Session::get('loginStatus'));

    View::share('APP_URL', env('APP_URL', false));
    View::share('v', env('ASSETS_VERSION', 0));
});