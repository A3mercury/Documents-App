<?php

Route::get('document/{document_id}')
    ->name('document.show')
    ->uses('DocumentsController@show');
