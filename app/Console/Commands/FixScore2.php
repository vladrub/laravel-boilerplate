<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\User;
use App\Work;

class FixScore2Command extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'users:fixScore2';

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
            $user->trainGameScore = (int)$user->trainGameScore;
            $user->score = $user->promocodesScore + $user->rostelecomScore + $user->hiddenObjectsScore + (int)$user->trainGameScore + $user->photoContestScore;
            $user->save();
        }
    }
}
