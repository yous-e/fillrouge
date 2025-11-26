<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'valeur',
        'couleur',
        'date_calcul',
    ];

    protected $casts = [
        'valeur' => 'integer',
        'couleur' => 'string',
        'date_calcul' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}