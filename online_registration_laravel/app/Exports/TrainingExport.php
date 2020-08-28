<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use DB;

class TrainingExport implements FromCollection,WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return DB::table('users')
                ->select('users.User_ID','users.F_Name','users.L_Name','users.Province','training.TISI','training.I_Factory','training.E_Payment')
                ->join('training','training.User_ID','=','users.User_ID')
                ->get();
    }
    public function headings(): array {
        return [
            'User_id',
            'F_Name',
            'L_Name',
            'Province',
            'TISI',
            'I_Factory',
            'E_Payment'
        ];
    }
}
