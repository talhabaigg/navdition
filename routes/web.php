<?php

use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('projects', ProjectController::class);
    Route::get('/projects/{project}/claim', [ProjectController::class, 'claim'])
        ->name('projects.claim');
    Route::get('/projects/{project}/release', [ProjectController::class, 'release'])
        ->name('projects.release');
    Route::get('/projects/{project}/complete', [ProjectController::class, 'complete'])
        ->name('projects.complete');
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
