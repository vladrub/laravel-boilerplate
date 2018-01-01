<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\User;
use App\Work;

class FixScoreCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'users:fixScore';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fix users score';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $users = User::get();

        foreach ($users as $user) {
            if ( $user->rostelecomScore > 0 ) {
                $user->score = $user->score - $user->rostelecomScore;
                $user->rostelecomScore = 0;

                $user->rostelecomScore = 250;
                $user->score = $user->score + 250;
                $user->save();
            }

            $works = Work::with('user')->with('likes')->where('user_id', $user->id)->get();
            $photoContestScore = 0;

            foreach ($works as $work) {
                $photoContestScore = $photoContestScore + $work->totalLikes;
            }

            $user->score = $user->score - $user->photoContestScore;
            $user->photoContestScore = 0;

            $user->photoContestScore = $photoContestScore;
            $user->score = $user->score + $photoContestScore;
            $user->save();
//
//            if ( $user->email == 'ahdpyxa78@gmail.com' ) {
//                dd($photoContestScore);
//            }
        }
    }
}
