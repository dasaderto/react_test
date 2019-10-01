<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use JWTAuth;

class AdminController extends Controller
{
    public function projectCreate(Request $request){
        return response()->json([
           'user'=>$request->user()
        ]);
    }
}
