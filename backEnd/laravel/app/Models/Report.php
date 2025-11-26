<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'fichier_pdf',
        'date_export',
    ];

    protected $casts = [
        'fichier_pdf' => 'string',
        'date_export' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}