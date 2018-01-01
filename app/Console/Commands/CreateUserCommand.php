<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\User;

class CreateUserCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:create {email} {password} {--admin}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create new user';

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
        $email = $this->argument('email');
        $password = $this->argument('password');
        $isAdmin = $this->option('admin');

        $user = User::where(['email' => $email])->first();

        if ( $user ) {
            $this->info('Пользователь с таким email уже существует, редактируем его.');
        } else {
            $this->info('Создаем нового пользователя.');
            $user = new User();
        }

        $user->email = $email;
        $user->password = $password;
        $user->role = ($isAdmin ? User::ROLE_ADMIN : User::ROLE_DEFAULT);

        $user->save();

        $this->info('email: ' . $email);
        $this->info('password: ' . $password);
        $this->info('isAdmin: ' . ($isAdmin ? 'true' : 'false'));
    }
}