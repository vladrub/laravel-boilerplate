<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\Redirect;
use Closure;
use App\Work;

class GamesData
{
    private $user;

    public function handle($request, Closure $next, $guard = null)
    {
        $this->user = $user = $request->get('user');

        if ( $this->user ) {
            $photoContestData = $request->session()->pull('photoContestData');

            if ( $photoContestData ) {
                $work = new Work();
                $work->html = $photoContestData[0]['html'];
                $work->json = $photoContestData[0]['json'];
                $work->user()->associate( $this->user );
                $work->save();

                $command = implode(' ', ['export QT_QPA_PLATFORM=offscreen;', 'timeout -k 5s 10s',
                    '/usr/bin/phantomjs',
                    base_path('bin/screen.js'),
                    url('/screenshot/' . $work->_id),
                    public_path('works/' . $work->_id . '.jpg')
                ]);
                $result = exec($command);

                $work->screenshot = '/works/' . $work->_id . '.jpg';
                $work->save();
            }

            $rostelecomLinkScore = $request->session()->pull('rostelecomLinkScore');

            if ( $rostelecomLinkScore ) {
                if ( $this->user->rostelecomLinkScore[0] != 100 ) {
                    $this->user->rostelecomLinkScore = 100;
                    $this->user->score = $this->user->score + 100;
                    $this->user->save();
                }
            }
        }

        return $next($request);
    }
}
