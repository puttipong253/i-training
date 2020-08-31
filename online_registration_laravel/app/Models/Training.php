<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Training extends Model
{
    protected $table = 'training';
    protected $fillable = ['TISI','I_Factory','E_Payment'];

    protected $primaryKey = 'User_ID';
}
