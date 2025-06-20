<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Stancl\Tenancy\Database\Concerns\BelongsToTenant;
use Spatie\Permission\Traits\HasRoles;


class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, BelongsToTenant, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['tenants'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function projects()
    {
        return $this->hasMany(Project::class, 'assigned_to', 'id');
    }

    public function isAdmin(): bool
    {
        return $this->hasRole('admin');
    }
    /**
     * The tenants.
     */
    protected function tenants(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->tenant_id ? [] :
            app(config('tenancy.domain_model'))->whereIn(
                "tenant_id",
                User::where('email', $this->email)
                    ->whereNotNull('tenant_id')
                    ->pluck('tenant_id')
                    ->filter()
                    ->unique()
                    ->values()
                    ->all()
            )->get()
        );
    }
}
