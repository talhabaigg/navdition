<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Tenant;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;
use Inertia\Response;
use Stancl\Tenancy\Database\Models\Domain;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        if (!tenant()) {
            return Inertia::render('auth/tenant-input');
        }
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
        $request->session()->put('user_id', \App\Models\User::where('email', $request->email)->value('id'));
        if (!tenant()) {
            return redirect()->route('tenant.input');
        }

        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false))->with('justLogged', true);
    }

    public function tenantInput()
    {
        return Inertia::render('auth/tenant-input', [

        ]);
    }

    public function redirectToTenant(Request $request)
    {
        $request->validate([
            'tenant' => 'required|string',
        ]);

        $tenantId = $request->input('tenant');

        // Find tenant domain by tenant ID
        $domain = Domain::where('tenant_id', $tenantId)->firstOrFail()->domain;

        // Parse app.url to get scheme and port
        $parsed = parse_url(config('app.url'));

        $scheme = $parsed['scheme'] ?? 'https';

        if (app()->environment('local')) {
            $port = ':8000';
        } elseif (!empty($parsed['port'])) {
            $port = ':' . $parsed['port'];
        } else {
            $port = '';
        }

        // Build full tenant URL with scheme, domain and port, redirecting to /login (or wherever)
        $tenantUrl = "{$scheme}://{$domain}{$port}/login";

        // Redirect to tenant URL
        return Inertia::location($tenantUrl);
    }

    /**
     * Handle an incoming authentication request in tenant context.
     */
    public function storeTenant(Request $request)
    {
        if (!tenant())
            abort(404);

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
