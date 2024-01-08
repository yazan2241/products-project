# Dockerfile
FROM php:8.1.2-cli

RUN apt-get update

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN docker-php-ext-install pdo mbstring

WORKDIR /var/www/html
COPY . .

RUN composer install

EXPOSE 8000
CMD php artisan serve --host=0.0.0.0 --port=8000