# Document Uploader App

### Description

### How to install
These directions assume that you already have PHP, [MySQL](https://www.npmjs.com/package/mysql), [Composer](https://getcomposer.org/), [Node](https://nodejs.org/en/download/), and [npm](https://www.npmjs.com/get-npm) installed on your machine. I also assume you have some sort of local server env setup. I will be using [valet](https://laravel.com/docs/5.6/valet).

The first step is to clone or download the code. Once it's downloaded (and unzipped) you can `cd` into the app directory.

Next you'll want to setup your local host to point to the app's url so you can view it in the browser. As stated earlier, I am using valet, so while in the app directory you can just run:
```
valet link docs-app
``` 
*Note, in my valet, I am using `.developer` so my url will look like `http://docs-app.developer`. You can use whatever you'd like.

Now that we have a valet link, we need to setup our `.env` file. You can either create the file manually, or use the terminal command:
```
touch .env`
```
in the app directory to create a `.env` file. Inside the `.env` file, we want to add these variables:
```
APP_NAME="Kraken Code Test"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://docs-app.developer # this needs to be whatever you're using for your local server.

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=kdocsdb
DB_USERNAME=**** # your MySQL db username
DB_PASSWORD=**** # your MySQL db password
```
You will want to create a new database in MySQL named `kdocsdb` using `UTF-8 Unicode (utf8mb4)` encoding and use whatever username and password you'd like. I personally like to use [the Sequel Pro app](https://www.sequelpro.com/).

Next we'll want to setup composer. In your terminal, you'll want to run:
```
composer install
```
Now that we've run `composer install` and created our `.env` file, we want to run:
```
php artisan key:generate
```
Next, run:
```
npm install
```

We are almost done. You can choose to run the next command if you would like to use seed data that I've created for the app. I added ~30 images taken from http://reddit.com/r/getmotivated just so you can have some pictures already stored. 

To get the seed data, you can simply run:
```
composer reseed
```
otherwise, you can run these in this order:
```
composer dump
php artisan migrate:reset
php artisan migrate
```
Lastly, run:
```
npm run dev
```
Now you can go to your url `http://doc-app.developer` and the app should be good to go! :)

### What to look for
