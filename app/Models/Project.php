<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{

    protected $fillable = [
        'title',
        'type',
        'attachment_link',
        'assigned_to',

        'description',

    ];
    public function assignee()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($project) {
            if (auth()->check()) {
                $project->created_by = auth()->id();
            }
        });
    }
}
