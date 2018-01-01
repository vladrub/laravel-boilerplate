<?php

namespace App\Api\V1\Controllers;

use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use Session;
use DataTables;
use Excel;
use Carbon\Carbon;
use App\User;
use App\Hero;
use App\Country;

class UsersController extends Controller
{
    use Helpers;

    private $request;
    private $user;

    public function __construct(Request $request) {
        $this->request = $request;

        $this->middleware(function (Request $request, $next) {
            $this->user = $user = $this->request->get('user');
            return $next($request);
        });
    }

    public function all() {
        $datatables = datatables(User::query());
        return $datatables->make(true);
    }

    public function get($id) {
        return User::find($id)->toArray();
    }

    public function post() {
        $user = new User([
            'email' => $this->request->get('email')
        ]);

        $user->role = (int)$this->request->get('role');

        if ( $this->request->get('password') != '' ) {
            $user->password = $this->request->get('password');
        }

        $user->save();
        return $user;
    }

    public function patch($id) {
        $user = User::find($id);

        if ( $user ) {
            $user->email = $this->request->get('email');
            $user->role = (int)$this->request->get('role');

            if ( $this->request->get('password') != '' ) {
                $user->password = $this->request->get('password');
            }

            $user->save();
            return $user;
        } else {
            throw new NotFoundHttpException();
        }
    }

    public function delete($id) {
        $user = User::find($id);

        if ( $user ) {
            $user->delete();
            return $this->response->noContent();
        } else {
            throw new NotFoundHttpException();
        }
    }

    public function profileUpdate () {
        $this->user->fullName = $this->request->get('fullName');
        $this->user->email = $this->request->get('email');
        $this->user->telephone = $this->request->get('telephone');
        $this->user->rostelecomId = $this->request->get('rostelecomId');
        $this->user->personalInformationAgreement = true;
        $this->user->rulesAgreement = true;
        $this->user->gender = (int)$this->request->get('gender');
        $this->user->city = (int)$this->request->get('city');

        if ( $this->user->rostelecomId != '' && $this->user->rostelecomScore == 0 ) {
            $this->user->rostelecomScore = 250;
            $this->user->score = $this->user->score + 250;
        }

        $this->user->save();

        return $this->user;
    }

    public function rostelecomIdUpdate () {
        $this->user->rostelecomId = $this->request->get('rostelecomId');

        if ( $this->user->rostelecomId != '' && $this->user->rostelecomScore == 0 ) {
            $this->user->rostelecomScore = 250;
            $this->user->score = $this->user->score + 250;
        }

        $this->user->save();

        return $this->user;
    }

    public function addPlayerId () {
        $newPlayerId = $this->request->get('playerId');
        $playerIds = $this->user->playerIds;

        if ( $playerIds === null ) $playerIds = [];

        if ( ! in_array($newPlayerId, $playerIds) ) {
            $playerIds[] = $newPlayerId;
        }

        $this->user->playerIds = $playerIds;

        $this->user->save();

        return $this->user->playerIds;
    }

    public function addHiddenObjectsResult () {
        $deer = $this->request->get('deer');
        $hiddenObjectsResults = $this->user->hiddenObjectsResults;

        if ( ! isset($hiddenObjectsResults['deer' . $deer]) || ! $hiddenObjectsResults['deer' . $deer] ) {
            $hiddenObjectsResults['deer' . $deer] = true;

            $this->user->hiddenObjectsResults = $hiddenObjectsResults;
            $this->user->hiddenObjectsScore = $this->user->hiddenObjectsScore + 25;
            $this->user->score = $this->user->score + 25;

            $this->user->save();
        }

        return $this->user->hiddenObjectsResults;
    }

    public function saveTrainGameScore () {
        $score = (int)$this->request->get('score');
        if ( $score > 1000 ) { $score = 1000; }

        if ( $this->user->trainGameScore < $score ) {
            $this->user->score = $this->user->score - (int)$this->user->trainGameScore;

            $this->user->trainGameScore = $score;
            $this->user->score = $this->user->score + $score;

            $this->user->save();
        }
    }

    public function saveRtLinkScore () {
        if ( $this->user ) {
            if ( $this->user->rostelecomLinkScore != 100 ) {
                $this->user->rostelecomLinkScore = 100;
                $this->user->score = $this->user->score + 100;
                $this->user->save();
            }
        } else {
            $this->request->session()->push('rostelecomLinkScore', 100);
        }

        return $this->response->noContent();
    }

    public function setSessionGender ($gender) {
        Session::put('gender', (int)$gender);
        return $this->response->noContent();
    }

    public function export() {
        Excel::create('Users export -' . Carbon::now()->toDateTimeString(), function($excel) {
            $excel->sheet('Все', function($sheet) {
                $data = [];

                $users = User::where('user')->get();

                foreach ($users as $user) {
                    $data[] = [
                        'ID #' => $user->id,

                        'Имя' => $user->fullName,
                        'email' => $user->email,

//                        'uid' => $user->id,
//                        'socialNetwork' => $user->id,
                        'Город' => $user->city,
                        'Телефон' => $user->telephone,
                        'ID Ростелеком' => $user->rostelecomId,

                        'Промокоды баллы' => $user->promocodesScore,
                        'Ростелеком баллы' => $user->rostelecomScore,
                        'Поиск предметов баллы' => $user->hiddenObjectsScore,
                        'Игра баллы' => $user->trainGameScore,
                        'Фотоконкурс баллы' => $user->photoContestScore,
                        'Всего баллов' => $user->score,
                    ];
                }

                $sheet->fromArray($data);
            });

            $excel->sheet('С ростелеком ID', function($sheet) {
                $data = [];

                $users = User::where('user')->get();

                foreach ($users as $user) {
                    if ( $user->rostelecomId == '' ) continue;
                    $data[] = [
                        'ID #' => $user->id,

                        'Имя' => $user->fullName,
                        'email' => $user->email,

//                        'uid' => $user->id,
//                        'socialNetwork' => $user->id,
                        'Город' => $user->city,
                        'Телефон' => $user->telephone,
                        'ID Ростелеком' => $user->rostelecomId,

                        'Промокоды баллы' => $user->promocodesScore,
                        'Ростелеком баллы' => $user->rostelecomScore,
                        'Поиск предметов баллы' => $user->hiddenObjectsScore,
                        'Игра баллы' => $user->trainGameScore,
                        'Фотоконкурс баллы' => $user->photoContestScore,
                        'Всего баллов' => $user->score,
                    ];
                }

                $sheet->fromArray($data);
            });
        })->export('xls');
    }
}
