<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Question extends Model
{
    protected $fillable = [
        'quiz_id',
        'title',
        'content',
        'type',
        'answer',
        'options'
    ];

    public function quiz(): BelongsTo {
        return $this->belongsTo(Quiz::class);
    }
}
