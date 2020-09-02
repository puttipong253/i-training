<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Training extends Model
{
    protected $table = 'training';
    protected $fillable = ['User_ID','TISI','I_Factory','E_Payment'];

    protected $primaryKey = 'T_ID';
}
