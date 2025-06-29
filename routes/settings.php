<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', 'settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance');

    Route::get('settings/billing', function () {
        $user = auth()->user();
        $tenant = $user->tenant;
        $owner = $tenant->owner;

        $subscription = $owner->subscription('default');

        // Check if the current user is subscribed (if you want to check owner instead, do $owner->subscribed)
        $subscribed = $owner->subscribed('default');

        return Inertia::render('settings/billing', compact('subscribed', 'subscription'));
    })->name('billing');

    Route::get('settings/billing/{subscription}/cancel', function ($subscription) {
        $user = auth()->user();
        $user->subscription('default')->cancelNow();

        return redirect()->route('billing')->with('success', 'Subscription cancelled successfully.');
    })->name('billing.cancel');
});
