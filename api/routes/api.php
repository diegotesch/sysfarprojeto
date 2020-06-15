<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/cadastrar', 'AuthController@cadastro');
Route::post('/entrar', 'AuthController@login');

Route::apiResource('/cliente', 'ClienteController')->middleware('auth:api');
