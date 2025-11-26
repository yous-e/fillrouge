<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\ScoreController;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\AdminController;

// Authentication (Public)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected Routes
Route::middleware(['auth:sanctum'])->group(function () {
    
    // Authentication
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);

    // Transactions
    Route::apiResource('transactions', TransactionController::class);

    // Scores
    Route::get('/score', [ScoreController::class, 'calculate']);
    Route::get('/score/history', [ScoreController::class, 'history']);
    Route::get('/score/latest', [ScoreController::class, 'show']);

    // Reports
    Route::post('/reports/generate', [ReportController::class, 'generateReport']);
    Route::get('/reports', [ReportController::class, 'getUserReports']);
    Route::get('/reports/{id}/download', [ReportController::class, 'download']);

    // Admin Routes
    Route::middleware(['isAdmin'])->prefix('admin')->group(function () {
        Route::get('/users', [AdminController::class, 'listUsers']);
        Route::delete('/users/{id}', [AdminController::class, 'deleteUser']);
        Route::get('/stats', [AdminController::class, 'stats']);
        Route::post('/users/{id}/role', [AdminController::class, 'assignRole']);
    });
});