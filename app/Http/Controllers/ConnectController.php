<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\View;
use Illuminate\Http\Request;
use OAuth\OAuth2\Token\StdOAuth2Token;
//use OAuth\Common\Storage\Session;
use Session;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;
use App\User;

class ConnectController extends Controller
{
    public function login ( Request $request ) {
        $user = User::where(["email" => $request->get('email')])->first();
        if ( ! $user ) return Redirect::back();

        Auth::login($user);

        Session::put('gender', $user->gender);

        if ( isset($_COOKIE['redirectTo']) && $_COOKIE['redirectTo'] != '' ) {
            return redirect($_COOKIE['redirectTo'])->with('loginStatus', 'success');
        } else {
            return redirect('/')->with('loginStatus', 'success');
        }
    }

    public function registration ( Request $request ) {
        $user = User::where(["email" => $request->get('email')])->first();

        if ( ! $user ) {
            $user = new User;
            $user->fullName = $request->get('fullName');
            $user->email = $request->get('email');
            $user->telephone = $request->get('telephone');
            $user->rostelecomId = $request->get('rostelecomId');
            $user->personalInformationAgreement = true;
            $user->rulesAgreement = true;
            $user->gender = (int)$request->get('gender');
            $user->city = $request->get('city');

            if ( $user->gender != 0 ) {
                Session::put('gender', $user->gender);
            }

            if ( $user->rostelecomId != '' && $user->rostelecomScore == 0 ) {
                $user->rostelecomScore = 250;
                $user->score = $user->score + 250;
            }

            $user->save();
        }

        Auth::login($user);

        if ( isset($_COOKIE['redirectTo']) && $_COOKIE['redirectTo'] != '' ) {
            return redirect($_COOKIE['redirectTo'])->with('loginStatus', 'success');
        } else {
            return redirect('/')->with('loginStatus', 'success');
        }
    }

    public function loginWithVKontakte (Request $request) {
        $code = $request->get('code');
        $vk = \OAuth::consumer('Vkontakte');

        if ( ! is_null($code))
        {
            $token = $vk->requestAccessToken($code);

            $result = json_decode($vk->request('users.get?fields=uid,first_name,last_name,screen_name,sex,bdate,photo_big&uids=' . $token->getExtraParams()['user_id']), true);
            $accessToken = $token->getAccessToken();

            if ( $result['response'] ) {
                $data = $result['response'][0];
                $user = User::where('uid', $data['uid'])->first();

                if ( ! $user ) {
                    $user = new User;
                    $user->fullName = $data['first_name'] . ' ' . $data['last_name'];
                    $user->uid = $data['uid'];
                    $user->email = ( isset($token->getExtraParams()['email']) ) ? $token->getExtraParams()['email'] : '';
                    $user->firstName = $data['first_name'];
                    $user->lastName = $data['last_name'];
                    $user->nickName = $data['screen_name'];
                    $user->gender = $data['sex'];
                    $user->photo = $data['photo_big'];
                    $user->socialNetwork = 'Vkontakte';
                }

                $user->accessToken = $accessToken;
                $user->save();
            }

            Session::put('gender', $user->gender);

            if ( isset($_COOKIE['redirectTo']) && $_COOKIE['redirectTo'] != '' ) {
                return redirect($_COOKIE['redirectTo'])->with('loginStatus', 'success');
            } else {
                return redirect('/')->with('loginStatus', 'success');
            }
        }
        else
        {
            $url = $vk->getAuthorizationUri();
            return redirect((string)$url);
        }
    }

    // https://developers.facebook.com/tools/explorer
    //https://developers.facebook.com/docs/graph-api

    public function loginWithFacebook (Request $request) {
        $code = $request->get('code');
        $fb = \OAuth::consumer('Facebook');

        if ( ! is_null($code))
        {
            $token = $fb->requestAccessToken($code);

            $result = json_decode($fb->request('/me?fields=id,name,gender,email,first_name,last_name,picture'), true);
            $accessToken = $token->getAccessToken();

            $user = User::where('uid', $result['id'])->first();

            if ( ! $user ) {
                $user = new User;
                $user->fullName = $result['name'];
                $user->uid = $result['id'];
                $user->firstName = $result['first_name'];
                $user->lastName = $result['last_name'];
                if ( isset($result['email']) ) {
                    $user->email = $result['email'];
                }
                $user->gender = $result['gender'];
                $user->photo = $result['picture']['data']['url'];
                $user->socialNetwork = 'Facebook';
            }

            $user->accessToken = $accessToken;
            $user->save();

            Session::put('gender', $user->gender);

            if ( isset($_COOKIE['redirectTo']) && $_COOKIE['redirectTo'] != '' ) {
                return redirect($_COOKIE['redirectTo'])->with('loginStatus', 'success');
            } else {
                return redirect('/')->with('loginStatus', 'success');
            }
        }
        else
        {
            $url = $fb->getAuthorizationUri();
            return redirect((string)$url);
        }
    }

    public function loginWithOdnoklassniki (Request $request) {
        $code = $request->get('code');
        $storage = new \OAuth\Common\Storage\Session();

        if ( ! is_null($code) )
        {
            $curl = curl_init('http://api.odnoklassniki.ru/oauth/token.do');
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_POSTFIELDS,
                'code=' . $_GET['code'] .
                '&redirect_uri=' . urlencode(asset('/connect/odnoklassniki')) .
                '&grant_type=authorization_code' .
                '&client_id=' . env('OK_APP_ID', false) .
                '&client_secret=' . env('OK_APP_SECRET', false)
            );

            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
            $s = curl_exec($curl);
            curl_close($curl);
            $auth = json_decode($s, true);

            $curl = curl_init(
                'http://api.odnoklassniki.ru/fb.do' .
                '?access_token=' . $auth['access_token'] .
                '&application_key=' . env('OK_APP_PUBLIC', false) .
                '&method=users.getCurrentUser&' .
                'sig=' . md5('application_key=' . env('OK_APP_PUBLIC', false) . 'method=users.getCurrentUser' . md5($auth['access_token'] . env('OK_APP_SECRET', false)))
            );
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
            $s = curl_exec($curl);
            curl_close($curl);

            $result = json_decode($s, true);
            $accessToken = $auth['access_token'];
            $user = User::where('uid', $result['uid'])->first();

            if ( ! $user ) {
                $user = new User;
                $user->fullName = $result['name'];
                $user->uid = $result['uid'];
                $user->firstName = $result['first_name'];
                $user->lastName = $result['last_name'];
                $user->gender = $result['gender'];
                $user->photo = $result['pic_1'];
                $user->socialNetwork = 'Odnoklassniki';
            }

            $user->accessToken = $accessToken;
            $user->save();

            $token = new StdOAuth2Token();
            $token->setAccessToken($auth['access_token']);
            $storage->storeAccessToken('Odnoklassniki', $token);

            Session::put('gender', $user->gender);

            if ( isset($_COOKIE['redirectTo']) && $_COOKIE['redirectTo'] != '' ) {
                return redirect($_COOKIE['redirectTo'])->with('loginStatus', 'success');
            } else {
                return redirect('/')->with('loginStatus', 'success');
            }
        }
        else
        {
            $url = 'http://www.odnoklassniki.ru/oauth/authorize?' .
                'client_id=' . env('OK_APP_ID', false) .
                '&scope=VALUABLE ACCESS' .
                '&response_type=code' .
                '&redirect_uri=' . urlencode(asset('/connect/odnoklassniki'));
            return redirect((string)$url);
        }
    }

    public function logout() {
        $storage = new \OAuth\Common\Storage\Session();
        Auth::logout();
        $storage->clearAllTokens();

        return redirect('/');
    }
}
