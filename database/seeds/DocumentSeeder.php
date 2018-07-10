<?php

use App\Document;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class DocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        $images = glob(storage_path() . "/seeds/images/*.{jpg,png,gif,pdf}", GLOB_BRACE);
        foreach ($images as $index => $image) {
            
            $ex = explode('/', $image);
            $name = $ex[sizeof($ex) - 1];
            
            $doc = Document::create([
                'name' => 'Seed Image #' . $index,
                'description' => 'Get motivated image #' . $index,
                'file_path' => 'public/documents',
                'file_name' => $name,
                'file_type' => mime_content_type($image),
                'file_size' => filesize($image),
            ]);

            Storage::put($doc->file_path . '/' . $doc->file_name, file_get_contents($image));
        }
    }
}