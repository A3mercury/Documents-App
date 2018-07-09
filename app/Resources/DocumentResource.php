<?php

namespace App\Resources;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Resources\Json\Resource;

class DocumentResource extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'created' => $this->created_at->toDayDateTimeString(),
            'image_type' => $this->file_type,
            'image' => Storage::url($this->file_path . '/' . $this->file_name),
        ];
    }
}
