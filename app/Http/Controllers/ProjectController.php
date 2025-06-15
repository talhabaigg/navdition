<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (auth()->user()->hasRole("admin")) {
            // If the user is an admin, show all projects
            $projects = Project::with('assignee', 'creator')->get();
        } else {
            $projects = Project::with('assignee', 'creator')
                ->where(function ($query) {
                    $query->whereNull('assigned_to')
                        ->where('status', 'open')
                        ->orWhere('assigned_to', auth()->id());
                })
                ->get();
        }

        $projectStats = [
            'open' => $projects->where('status', 'open')->count(),
            'active' => $projects->where('status', 'claimed')->count(),
            'under_review' => $projects->where('status', 'under_review')->count(),
            'completed' => $projects->where('status', 'completed')->count(),
        ];

        $activeProjectsByAssignee = $projects
            ->where('status', 'claimed')
            ->groupBy('assigned_to')
            ->map(function ($group) {
                return $group->values();
            });

        return Inertia::render('projects/index', [
            'projects' => $projects,
            'projectStats' => $projectStats,
            'activeProjects' => $activeProjectsByAssignee,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        // Validate the request data
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|string',
            'attachment_link' => 'nullable|url',
            'due_date' => 'nullable|date',

        ]);
        // dd($request->due_date);

        Project::create($request->all());

        return redirect()->route('projects.index')->with('success', 'Project created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        Project::destroy($project->id);

        return redirect()->route('projects.index')->with('success', 'Project deleted successfully.');
    }

    public function claim(Project $project)
    {
        // Check if the project is already claimed
        if ($project->assigned_to) {
            return redirect()->route('projects.index')->with('error', 'Project is already claimed.');
        }
        // Assign the project to the authenticated user
        $project->status = 'claimed';
        $project->assigned_to = auth()->id();
        $project->save();

        return redirect()->back()->with('success', 'Project claimed successfully.');
    }
    public function release(Project $project)
    {
        // Check if the project is claimed by the authenticated user
        if ($project->assigned_to !== auth()->id()) {
            return redirect()->route('projects.index')->with('error', 'You cannot release this project.');
        }
        // Release the project
        $project->status = 'open';
        $project->assigned_to = null;
        $project->save();

        return redirect()->back()->with('success', 'Project released successfully.');
    }
    public function complete(Project $project)
    {
        if ($project->assigned_to !== auth()->id()) {
            return redirect()->route('projects.index')->with('error', 'You cannot complete this project.');
        }
        // Mark the project as completed
        $project->status = 'completed';
        $project->save();
        return redirect()->back()->with('success', 'Project marked as completed successfully.');
    }
}
