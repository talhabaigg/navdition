<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Tenant;
use App\Models\Domain;


class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): \Symfony\Component\HttpFoundation\Response
    {
        $validated = $request->validate([
            'tenant_id' => [
                'required',
                'string',
                'max:255',
                Rule::unique('tenants', 'id'),
            ],
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique('users', 'email'),
            ],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // 2. Create the Tenant
        $tenant = Tenant::create([
            'id' => $validated['tenant_id'],
            'name' => $validated['name'],
        ]);

        // 3. Build & save tenant domain
        $appHost = parse_url(config('app.url'), PHP_URL_HOST) ?: 'localhost';
        $tenantDomain = "{$tenant->id}.{$appHost}";
        $domain = $tenant->domains()->create([
            'domain' => $tenantDomain,
        ]);

        // 4. Create the first user under that tenant
        //    (be sure your User model has a tenant_id column and default TenantScope)
        $user = User::create([
            'tenant_id' => $tenant->id,
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        event(new Registered($user));
        Auth::login($user);

        // 5. Build the full redirect URL
        $parsed = parse_url(config('app.url'));
        $scheme = $parsed['scheme'] ?? 'https';
        $port = '';
        if (app()->environment('local')) {
            $port = ':8000';
        } elseif (!empty($parsed['port'])) {
            $port = ':' . $parsed['port'];
        }
        $url = "{$scheme}://{$tenantDomain}{$port}/dashboard";

        // 6. Send the browser over to their tenant dashboard
        return Inertia::location($url);
    }
}
