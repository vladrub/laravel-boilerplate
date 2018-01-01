# laravel-boilerplate

## Install

- composer install
- cp .env.example .env
- php artisan key:generate
- chmod 777 storage/logs storage/framework/views/twig/ bootstrap/cache storage storage/app/local storage/framework/sessions storage/framework/views public/uploads public/works public/licenses storage/logs/ storage/app/local
- cp app/admin/src/app/shared/config.example.ts app/admin/src/app/shared/config.ts
- cd app/admin && npm install && npm run build:prod
- Создаем нового пользователя для админки - php artisan user:create email@gmail.com mypassword --admin

## Requirements

- PHP >= 5.6.4 
- MongoDB PHP Extension
- OpenSSL PHP Extension
- PDO PHP Extension
- Mbstring PHP Extension
- Tokenizer PHP Extension