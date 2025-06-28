<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

foreach (config('tenancy.central_domains') as $domain) {

    Route::domain($domain)->group(function () {
        require base_path('routes/shared.php');
    });
}
