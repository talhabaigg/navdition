<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = [
        'invoice_number',
        'name',
        'email',
        'address',
        'phone',
        'invoice_date',
        'due_date',
        'amount',
        'notes',
        'user_id', // Assuming you want to associate the invoice with a user
    ];

    public function items()
    {
        return $this->hasMany(InvoiceItem::class);
    }
}
