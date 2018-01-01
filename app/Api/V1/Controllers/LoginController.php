<?php

namespace App\Api\V1\Controllers;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Tymon\JWTAuth\PayloadFactory;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use App\User;
use Cookie;

// Role based auth
// https://scotch.io/tutorials/role-based-authentication-in-laravel-with-jwt

class LoginController extends Controller
{
    private $request;

    public function __construct(Request $request) {
        $this->request = $request;
    }

    public function login(Request $request, JWTAuth $JWTAuth)
    {
        $credentials = $request->only(['email', 'password']);

        try {
            $user = User::where(["email" => $credentials['email']])->first();

            if ( ! $user ) { throw new AccessDeniedHttpException(); }
            if ( $user->role != User::ROLE_ADMIN ) { throw new AccessDeniedHttpException(); }

            if ( $user->matchPasswords( $credentials['password'] ) ) {
                $token = $JWTAuth->fromUser($user);

                if(!$token) {
                    throw new AccessDeniedHttpException();
                }
            } else {
                throw new AccessDeniedHttpException();
            }
        } catch (JWTException $e) {
            throw new HttpException(500);
        }

        return response()
            ->json([
                'status' => 'success',
                'token' => $token
            ]);
    }

    public function validateCredentials() {
        $user = User::where(["login" => $this->request->get('login')])->first();
        if ( ! $user ) {
            if ( $this->request->get('revert') == 'true' ) return json_encode( true );
            return json_encode(false);
        }

        $passwordMatch = false;

        if ( $user->matchPasswords( $this->request->get('password') ) ) {
            $passwordMatch = true;
        }

        if ( $this->request->get('revert') == 'true' ) return json_encode( ! $passwordMatch );

        return json_encode($passwordMatch);
    }

    public function validatePassword() {
        $user = User::where(["login" => $this->request->get('login')])->first();
        if ( ! $user ) throw new AccessDeniedHttpException();

        if ( $user->matchPasswords( $this->request->get('password') ) ) {
            return json_encode(true);
        } else {
            return json_encode(false);
        }
    }
}