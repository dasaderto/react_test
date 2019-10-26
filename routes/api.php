<?php

use App\Http\Controllers\Admin\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/questions/list', 'QuestionController@index');
Route::post('/test/start', 'QuestionController@testStart');


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['middleware' => ['jwt-auth', 'api-header']], function () {

    Route::get('users/list', function () {
        $users = App\User::all();

        $response = ['success' => true, 'data' => \request()];
        return response()->json($response, 201);
    });

    Route::group(['namespace' => 'Admin'], function () {
        Route::post('/project', 'AdminController@projectCreate');
    });
});
Route::group(['middleware' => 'api-header'], function () {
    Route::post('user/login', 'UserController@login');
    Route::post('user/register', 'UserController@register');
});

