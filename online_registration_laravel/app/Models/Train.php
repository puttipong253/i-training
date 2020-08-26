<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Train extends Model
{
    protected $table = 'trains';
    protected $fillable = ['User_ID','TISI','I_Factory','E_Payment'];

    protected $primaryKey = 'User_ID';
}
