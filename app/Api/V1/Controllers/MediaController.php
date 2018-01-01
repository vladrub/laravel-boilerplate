<?php

namespace App\Api\V1\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Media;

class MediaController extends Controller
{
    use Helpers;

    public function postImage(Request $request) {
        if ($request->hasFile('image')) {
            $fileName = $request->image->store('', 'public');
            
            $media = new Media([
                'originalName' => $request->image->getClientOriginalName(),
                'mimeType' => $request->image->getClientMimeType(),
                'destination' => 'uploads/',
                'filename' => $fileName,
                'path' => 'uploads/' . $fileName,
                'fullPath' => 'uploads/' . $fileName,
                'size' => $request->image->getClientSize()
            ]);

            $media->save();

            return $media->toArray();
        } else {
            return $this->response->errorBadRequest();
        }
    }
}
