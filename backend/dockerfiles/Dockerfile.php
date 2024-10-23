FROM php:latest

WORKDIR /usr/src/app

COPY . .

CMD ["php", "script.php"]
