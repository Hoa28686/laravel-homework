<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\NameColorController;
use App\Http\Controllers\Api\WordController;



Route::apiResource('name-colors', NameColorController::class);

Route::apiResource('words', WordController::class);
Route::delete('/api/words/{finnish}', [WordController::class, 'destroy']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
