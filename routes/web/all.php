<?php

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;

include 'home.php';
include 'documents.php';

Route::get('/testing', function () {
    Storage::download('documents/LWSwg36XgNX06mrc');
});
