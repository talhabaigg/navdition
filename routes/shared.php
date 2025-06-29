<?php

use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Laravel\Cashier\Http\Controllers\WebhookController;
Route::get('/', function (Request $request) {
    // If tenancy was not initialized (i.e., tenant not found), redirect to login
    if (tenancy()->initialized) {
        return redirect()->route('login');
    }

    // Tenant is valid, render tenant home page
    return Inertia::render('welcome');
})->name('home');

//Route::post('/stripe/webhook', [WebhookController::class, 'handleWebhook'])
//->name('cashier.webhook');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $users = User::withCount([
            'projects as projects_count' => function ($query) {
                $query->whereBetween('created_at', [now()->startOfMonth(), now()->endOfMonth()]);
            }
        ])
            ->get();

        return Inertia::render('dashboard', [
            'users' => $users,
        ]);
    })->name('dashboard');

    Route::resource('projects', ProjectController::class);
    Route::get('/projects/{project}/claim', [ProjectController::class, 'claim'])
        ->name('projects.claim');
    Route::get('/projects/{project}/release', [ProjectController::class, 'release'])
        ->name('projects.release');
    Route::get('/projects/{project}/complete', [ProjectController::class, 'complete'])
        ->name('projects.complete');
    Route::get('/projects/{project}/submit', [ProjectController::class, 'submit'])
        ->name('projects.submit');


    Route::get('/users/create', [UserController::class, 'create'])
        ->name('users.create');
    Route::post('/users', [UserController::class, 'store'])
        ->name('users.store');
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/users/{user}', [UserController::class, 'show'])
        ->name('users.show');



    Route::resource('invoices', InvoiceController::class)->names('invoices');
    Route::get('/invoices/{invoice}/print', [InvoiceController::class, 'print'])
        ->name('invoices.print');


    Route::get('/checkout', \App\Http\Controllers\CheckoutController::class)
        ->name('checkout');


});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
