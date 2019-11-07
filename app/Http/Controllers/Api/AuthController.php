<?php

namespace App\Http\Controllers\Api;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = Validator::make($request->all(), [
            'username' => 'required|max:55',
            'email' => 'email|required|unique:users,email',
            'password' => 'required|confirmed'
        ]);

        if ($data->fails()) {
            return response()->json(['error' => $data->errors()]);
        }

        $password = Hash::make($request->password);
        $user = User::create([
            'name' => $request->username,
            'email' => $request->email,
            'password' => $password
        ]);

        $accessToken = $user->createToken('authToken');

        return response(['success' => true, 'data' => ['id' => $user->id, 'auth_token' => $accessToken->accessToken, 'name' => $user->name, 'email' => $user->email,'expires_in' => $accessToken->token->expires_at]]);
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);

        if (!auth()->attempt(request(['email', 'password']))) {
            return response()->json([
                'success' => false,
                'data' => 'Record doesnt exists'
            ]);
        }

        $user = Auth::user();
        $accessToken = $user->createToken('authToken');
        return response([
            'success' => true,
            'data' => ['id' => $user->id,
                'auth_token' => $accessToken->accessToken,
                'expires_in' => $accessToken->token->expires_at,
                'name' => $user->name,
                'email' => $user->email]
        ]);
    }

    public function logout()
    {
        auth('api')->user()->token()->revoke();
        return response()->json([
            'success' => 'succes logout'
        ]);
    }
}
