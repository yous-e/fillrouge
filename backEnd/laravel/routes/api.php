<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\ScoreController;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\AdminController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Toutes les routes de ton backend FinanceScore
|
*/

// Authentification
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/profile', [AuthController::class, 'profile'])->middleware('auth:sanctum');

// Routes protégées (utilisateurs connectés)
Route::middleware(['auth:sanctum'])->group(function () {

    // Transactions
    Route::apiResource('transactions', TransactionController::class);

    // Score
    Route::get('/score', [ScoreController::class, 'calculate']);
    Route::get('/score/history', [ScoreController::class, 'history']);
    Route::get('/score/{id}', [ScoreController::class, 'show']);

    // Rapports PDF
    Route::post('/report/export', [ReportController::class, 'export']);
    Route::get('/report/list', [ReportController::class, 'list']);
    Route::get('/report/download/{id}', [ReportController::class, 'download']);

    // Administration (protégé par middleware isAdmin)
    Route::middleware(['isAdmin'])->group(function () {
        Route::get('/admin/users', [AdminController::class, 'listUsers']);
        Route::delete('/admin/users/{id}', [AdminController::class, 'deleteUser']);
        Route::get('/admin/stats', [AdminController::class, 'stats']);
        Route::post('/admin/users/{id}/role', [AdminController::class, 'assignRole']);
    });
});
