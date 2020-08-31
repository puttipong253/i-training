<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class UsersExport implements FromCollection,WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return User::select('User_id','Prefix','F_Name','L_Name','Gender','Rank','Email','Phone','Province','Food_Group','Food_Allergy')->get();
    }
    public function headings(): array {
        return [
            'User_id',
            'Prefix',
            'F_Name',
            'L_Name',
            'Gender',
            'Rank',
            'Email',
            'Phone',
            'Province_ID',
            'Food_Group',
            'Food_Allergy'
        ];
    }
}
