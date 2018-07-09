<?php

Route::get('/')
    ->name('home.index')
    ->uses('DocumentsController@index');