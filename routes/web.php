<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

foreach (config('tenancy.central_domains') as $domain) {

    Route::domain($domain)->group(function () {
        require base_path('routes/shared.php');
    });
}
