<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Attendance public Route
Route::post('/attendance/scan', [App\Http\Controllers\Api\AttendanceController::class, 'scan']);

// Admin Management Route
Route::post('/admin/login', [App\Http\Controllers\Api\AdminController::class, 'login']);
Route::get('/admin/users', [App\Http\Controllers\Api\AdminController::class, 'getUsers']);
Route::post('/admin/users', [App\Http\Controllers\Api\AdminController::class, 'storeUser']);