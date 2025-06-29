<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render("users/index", [
            'users' => User::with('roles')->get(),
        ]);
    }
    public function create()
    {

        return Inertia::render("users/create");
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'password_confirmation' => 'required|string|min:8',
        ]);

        $tenant = $request->user()->tenant; // Get the tenant from the authenticated user

        if (!$tenant) {
            return redirect()->route('login')->with('error', 'Tenant not found. Please log in to create a user.');
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'tenant_id' => $tenant->id, // Assign the tenant ID
        ]);

        // Optionally, assign roles or perform other actions here

        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }
    public function show(User $user)
    {
        $user->load('roles', 'projects');
        $projects_this_month = $user->projects->filter(function ($project) {
            return $project->created_at->isCurrentMonth();
        })->values(); // <-- call values() here on the filtered collection

        $projects_last_month = $user->projects->filter(function ($project) {
            return $project->created_at->isLastMonth();
        })->values();


        return Inertia::render("users/show", [
            'user' => $user,
            'projects_this_month' => $projects_this_month,
            'projects_last_month' => $projects_last_month,
        ]);
    }


}

