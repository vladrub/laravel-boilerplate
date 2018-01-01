<?php

use OAuth\Common\Storage\Session;

return [

    /*
    |--------------------------------------------------------------------------
    | oAuth Config
    |--------------------------------------------------------------------------
    */

    /**
     * Storage
     */
    'storage' => new Session(),

    /**
     * Consumers
     */
    'consumers' => [

        'Vkontakte' => [
            'client_id' => env('VK_APP_ID', null),
            'client_secret' => env('VK_APP_SECRET', null),
            'scope' => [],
        ],

        'Facebook' => [
            'client_id' => env('FB_APP_ID', null),
            'client_secret' => env('FB_APP_SECRET', null),
            'scope' => ['user_about_me'],
        ]

    ]

];