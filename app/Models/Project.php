<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Stancl\Tenancy\Database\Concerns\BelongsToTenant;

class Project extends Model
{
    use BelongsToTenant;

    public function assignee()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}
