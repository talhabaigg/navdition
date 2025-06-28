<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Laravel\Cashier\Http\Controllers\WebhookController;

foreach (config('tenancy.central_domains') as $domain) {

    Route::domain($domain)->group(function () {
        require base_path('routes/shared.php');
    });


}
Route::post('/stripe/webhook', [WebhookController::class, 'handleWebhook'])->name('cashier.webhook');