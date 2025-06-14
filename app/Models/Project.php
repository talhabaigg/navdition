<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Stancl\Tenancy\Database\Concerns\BelongsToTenant;

class Project extends Model
{
    use BelongsToTenant;

    protected $fillable = [
        'title',
        'type',
        'attachment_link',
        'assigned_to',
        'due_date',
        'description',
        'price',

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
