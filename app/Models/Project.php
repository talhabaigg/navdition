<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    public function assignee()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}
