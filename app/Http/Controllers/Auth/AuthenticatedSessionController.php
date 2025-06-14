<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false))->with('justLogged', true);
    }

    /**
     * Handle an incoming authentication request in tenant context.
     */
    public function storeTenant(Request $request)
    {
        if (! tenant()) abort(404);

        Auth::login($user = \App\Models\User::where('email', $request->email)->where('tenant_id', tenant('id'))->firstOrFail());

        return redirect()->intended(route('dashboard', absolute: false));
    }

    public function generateTenant(Request $request)
    {
        $request->validate([
            'domain' => 'required|string',
            'email' => 'required|email',
        ]);
    
        $domain = $request->input('domain');
        $email = $request->input('email');
    
        $parsed = parse_url(config('app.url'));
        $scheme = $parsed['scheme'] ?? 'https';
        $port = $parsed['port'] ?? null;
    
        URL::forceRootUrl("{$scheme}://{$domain}" . ($port ? ':' . $port : ''));
    
        $signedUrl = URL::temporarySignedRoute(
            'tenant.login',
            now()->addMinutes(10),
            ['email' => $email]
        );
    
        URL::forceRootUrl(null);
    
        return Inertia::location($signedUrl);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Inertia::location('/');
    }
}
