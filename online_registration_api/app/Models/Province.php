<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    protected $table = 'provinces';
    protected $fillable = [
                            'code',
                            'name_th',
                            'name_en',
                            'geography_id',
                        ];
}
