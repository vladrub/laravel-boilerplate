<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Hash;
use Carbon\Carbon;
use Illuminate\Notifications\Notifiable;
use Illuminate\Auth\Authenticatable;
use OAuth\Common\Storage\Session;
use Illuminate\Support\Facades\Auth;

class User extends Eloquent implements \Illuminate\Contracts\Auth\Authenticatable
{
    const ROLE_DEFAULT = 0;
    const ROLE_ADMIN = 1;

    public static $humanRole = [
        self::ROLE_DEFAULT => 'Пользователь',
        self::ROLE_ADMIN => 'Суперюзер'
    ];

    const GENDER_DEFAULT = 0;
    const GENDER_FEMALE = 1;
    const GENDER_MALE = 2;

    public static $humanGender = [
        self::GENDER_DEFAULT => 'Не определено',
        self::GENDER_FEMALE => 'Женский',
        self::GENDER_MALE => 'Мужской',
    ];

    use Authenticatable;
    use Notifiable;

    protected $collection = 'users';
    protected $connection = 'mongodb';

    protected $attributes = array(
        'gender' => User::GENDER_DEFAULT,
        'email' => '',
        'password' => '',
        'role' => User::ROLE_DEFAULT,

        'uid' => '',
        'firstName' => '',
        'lastName' => '',
        'fullName' => '',
        'photo' => '',
        'socialNetwork' => '',
        'accessToken' => '',
    );
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'fullName', 'gender','email', 'password', 'role',
        'uid', 'firstName', 'lastName', 'photo', 'socialNetwork', 'accessToken'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['password'];

    /**
     * Boot function for using with User Events
     *
     * @return void
     */
    protected static function boot()
    {
    }

    /**
     * Automatically creates hash for the user password.
     *
     * @param  string  $value
     * @return void
     */
    public function setPasswordAttribute($value)
    {
        $salt = $this->randString(8);
        $password = $salt.md5($salt.$value);
        $this->attributes['password'] = $password;
    }

    public function matchPasswords($pass) {
        $salt = substr($this->password, 0, strlen($this->password) - 32);
        $realPassword = substr($this->password, -32);
        $password = md5($salt.$pass);

        if ( $password == $realPassword ) {
            return true;
        } else {
            return false;
        }
    }

    public function randString($pass_len=10, $pass_chars=false)
    {
        static $allchars = "abcdefghijklnmopqrstuvwxyzABCDEFGHIJKLNMOPQRSTUVWXYZ0123456789";
        $string = "";
        if(is_array($pass_chars))
        {
            while(strlen($string) < $pass_len)
            {
                if(function_exists('shuffle'))
                    shuffle($pass_chars);
                foreach($pass_chars as $chars)
                {
                    $n = strlen($chars) - 1;
                    $string .= $chars[mt_rand(0, $n)];
                }
            }
            if(strlen($string) > count($pass_chars))
                $string = substr($string, 0, $pass_len);
        }
        else
        {
            if($pass_chars !== false)
            {
                $chars = $pass_chars;
                $n = strlen($pass_chars) - 1;
            }
            else
            {
                $chars = $allchars;
                $n = 61; //strlen($allchars)-1;
            }
            for ($i = 0; $i < $pass_len; $i++)
                $string .= $chars[mt_rand(0, $n)];
        }
        return $string;
    }
}
