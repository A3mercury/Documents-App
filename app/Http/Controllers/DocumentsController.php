<?php

namespace App\Http\Controllers;

use App\Document;
use Illuminate\Http\Request;

class DocumentsController extends Controller
{
    public function index()
    {
        return view('home');
    }

    public function show(Document $document)
    {
        return view('documents.show')
            ->with([
                'document' => Document::find($document->id),
            ]);
    }
}
