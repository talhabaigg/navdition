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

