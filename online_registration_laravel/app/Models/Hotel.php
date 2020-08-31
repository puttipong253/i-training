<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    protected $table = 'hotels';
    protected $fillable = ['User_ID','Check_In','Check_Out','Partner_ID','Partner_Province_ID','Room_Number','Note'];

    protected $primaryKey = 'User_ID';
}
