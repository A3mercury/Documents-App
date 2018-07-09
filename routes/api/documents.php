<?php

Route::get('documents')
    ->name('documents.index')
    ->uses('DocumentsApiController@index');

Route::post('document/store')
    ->name('documents.store')
    ->uses('DocumentsApiCOntroller@store');

Route::post('document/delete')
    ->name('documents.delete')
    ->uses('DocumentsApiController@delete');
