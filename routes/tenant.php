<?php

declare(strict_types=1);

use App\Http\Controllers\ProjectController;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Tenant Routes
|--------------------------------------------------------------------------
|
| Here you can register the tenant routes for your application.
| These routes are loaded by the TenantRouteServiceProvider.
|
| Feel free to customize them however you want. Good luck!
|
*/

Route::middleware([
    'web',
    InitializeTenancyByDomain::class,
    PreventAccessFromCentralDomains::class,
])->group(function () {
    Route::get('/', function () {
        return 'This is your multi-tenant application. The id of the current tenant is ' . tenant('id');
    });

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
});
