<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use DB;

class HotelExport implements FromCollection,WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return DB::table('users')
                ->select('users.User_ID','users.F_Name','users.L_Name','users.Province','hotels.Check_In','hotels.Check_Out','hotels.Partner_Name','hotels.Partner_Province','hotels.Room_Number','Note')
                ->join('hotels','hotels.User_ID','=','users.User_ID')
                ->get();
    }
    public function headings(): array {
        return [
            'User_id',
            'F_Name',
            'L_Name',
            'Province',
            'Check_In',
            'Check_Out',
            'Partner_Name',
            'Partner_Province',
            'Room_Number',
            'Note'
        ];
    }
}
