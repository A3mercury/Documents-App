<?php

namespace App\Http\Controllers\Api;

use App\Document;
use Illuminate\Http\Request;
use App\Resources\DocumentResource;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class DocumentsApiController extends Controller
{
    public function index()
    {        
        return response()->json([
            'documents' => DocumentResource::collection(Document::orderBy('id', 'desc')->get()),
        ]);
    }

    public function store()
    {
        $this->validate(request(), [
            'name' => 'required|string|max:48',
            'description' => 'required|string|max:255',
            'file_data' => 'required|max:20000',
        ]);

        try {
            $file = request()->file('file_data');

            $document = Document::create([
                'name' => request()->get('name'),
                'description' => request()->get('description'),
                'file_path' => 'public/documents',
                'file_name' => $file->getClientOriginalName(),
                'file_type' => $file->getMimeType(),
                'file_size' => $file->getSize(),
            ]);

            Storage::put($document->file_path . '/' . $document->file_name, file_get_contents($file));

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'There was a problem uploading the Document.',
                'error' => $e->getMessage(),
            ]);
        }

        return response()->json([
            'message' => 'Document uploaded successfully.',
        ]);
    }

    public function delete()
    {
        $this->validate(request(), [
            'document' => 'required|integer|exists:documents,id',
        ]);

        try {
            $document = Document::find(request()->get('document'));

            Storage::delete($document->file_path . '/' . $document->file_name);

            $document->delete();

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'There was a problem deleting the Document.',
                'error' => $e->getMessage(),
            ]);
        }

        return response()->json([
            'message' => 'Document deleted successfully.',
        ]);
    }
}
