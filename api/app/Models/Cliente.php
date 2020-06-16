<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $fillable = [
        'nome', 'telefone', 'email', 'data_nascimento'
    ];

    public function getIdadeAttribute()
    {
        $idade = Carbon::createFromFormat('Y-m-d', $this->data_nascimento);
        return $idade->diffInYears(Carbon::now());
    }
}
