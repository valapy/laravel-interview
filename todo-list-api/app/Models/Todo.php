<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Todo extends Model
{

    use Hasfactory;

    protected $fillable = [
        'content',
        'status'
    ];

    protected $casts = [
        'status' => 'boolean',
    ];
}
