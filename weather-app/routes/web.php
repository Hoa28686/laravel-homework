<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeatherController;

// Route::get('/',function(){
//     return view('weather');
// });
Route::get('/',[WeatherController::class,'index'])->name('weather');