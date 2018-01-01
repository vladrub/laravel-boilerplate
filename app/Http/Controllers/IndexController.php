<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\View;
use Illuminate\Routing\Controller as BaseController;
use Session;
use Illuminate\Http\Request;
use App\Http\Requests\Settings;
use Carbon\Carbon;
use Jenssegers\Agent\Agent;

class IndexController extends Controller
{
    private $request;
    private $user;

    public function __construct(Request $request)
    {
        $this->request = $request;
        $this->middleware('\App\Http\Middleware\Connect', ['except' => ['index']]);

        $this->middleware(function (Request $request, $next) {
            $this->user = $user = $this->request->get('user');

            View::composer('*', function($view) use($user) {
                View::share('user', $user);
            });
            
            return $next($request);
        });
    }

    public function index(Request $request)
    {
        return view('site.index', []);
    }
}