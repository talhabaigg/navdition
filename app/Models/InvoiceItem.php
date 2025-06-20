<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InvoiceItem extends Model
{
    protected $fillable = [
        'description',
        'quantity',
        'rate',
        'total',
        'invoice_id', // Foreign key to associate with Invoice
    ];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}
