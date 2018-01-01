<?php

use Illuminate\Http\Request;
use Dingo\Api\Routing\Router;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/** @var Router $api */
$api = app(Router::class);

$api->version('v1', function (Router $api) {
    // https://github.com/francescomalatesta/laravel-api-boilerplate-jwt

    $api->group(['prefix' => 'media'], function(Router $api) {
        $api->post('image', 'App\Api\V1\Controllers\MediaController@postImage');
    });

    $api->group(['middleware' => 'web'], function(Router $api) {

    });

    $api->group(['middleware' => ['public_api']], function(Router $api) {

    });

    $api->group(['prefix' => 'auth'], function(Router $api) {
        $api->post('login', 'App\Api\V1\Controllers\LoginController@login');
    });

    $api->group(['middleware' => 'jwt.auth'], function(Router $api) {
        $api->get('users', 'App\Api\V1\Controllers\UsersController@all');
        $api->get('user/{id}', 'App\Api\V1\Controllers\UsersController@get');
        $api->post('user', 'App\Api\V1\Controllers\UsersController@post');
        $api->patch('user/{id}', 'App\Api\V1\Controllers\UsersController@patch');
        $api->delete('user/{id}', 'App\Api\V1\Controllers\UsersController@delete');
    });
});