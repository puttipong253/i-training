<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Hotel;
use Illuminate\Http\Request;
use App\Exports\UsersExport;
use App\Exports\TrainingExport;
use App\Exports\HotelExport;
use Maatwebsite\Excel\Facades\Excel;
use DB;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DB::table('users')
                ->join('provinces as p','p.id','=','users.Province_ID')
                ->select('User_ID','Prefix','F_Name','L_Name','Gender','Rank','Email','Phone','p.name_th as p_name','Province_ID','Food_Group','Food_Allergy','Status')
                ->get();
    }
    public function matching()
    {
        return DB::table('users')
                ->join('provinces as p','p.id','=','users.Province_ID')
                ->where('Status','=',1)
                ->select('User_ID','Prefix','F_Name','L_Name','Gender','Rank','Email','Phone','p.name_th as p_name','Province_ID','Food_Group','Food_Allergy','Status')
                ->get();
    }
    public function usersTraining()
    {
        return DB::table('users')
                    ->select('users.User_ID','users.F_Name','users.L_Name','users.Province_ID','training.TISI','training.I_Factory','training.E_Payment','p.name_th as p_name',)
                    ->join('training','training.User_ID','=','users.User_ID')
                    ->join('provinces as p','p.id','=','users.Province_ID')
                    ->get();
    }

    public function usersHotel()
    {
        return DB::table('users')
                    ->leftjoin('hotels as h','users.User_ID','=','h.User_ID')
                    ->join('provinces as p','p.id','=','users.Province_ID')
                    ->select('users.User_ID','users.F_Name as F_1','users.L_Name as L_1','users.Province_ID','h.Check_In','h.Check_Out','h.Room_ID','Note','p.name_th as p_name')
                    ->get();
    }
    public function usersRoom()
    {
        return DB::table('rooms')
                    ->leftjoin('users as u1','rooms.User_1_ID','=','u1.User_ID')
                    ->leftjoin('users as u2','rooms.User_2_ID','=','u2.User_ID')
                    ->leftjoin('hotels as h','rooms.Room_ID','=','h.Room_ID')
                    ->select('rooms.Room_ID','u1.F_Name as F_1','u1.L_Name as L_1','u2.F_Name as F_2','u2.L_Name as L_2','rooms.Room_Number')
                    ->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'Prefix' => 'required',
            'F_Name' => 'required',
            'L_Name' => 'required',
            'Gender' => 'required',
            'Rank' => 'required',
            'Email' => 'required',
            'Phone' => 'required',
            'Province_ID' => 'required',
            'Food_Group' => 'required',
            'Status' => 'required',
        ]);
        $user = User::create($request->all());
        return $user;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return User::find($id);
    }

    public function exportUser()
    {
        return Excel::download(new UsersExport, 'users.xlsx');
        "Export succesfuly";
    }
    public function exportTraining()
    {
        return Excel::download(new TrainingExport, 'training.xlsx');
        "Export succesfuly";
    }
    public function exportHotel()
    {
        return Excel::download(new HotelExport, 'hotel.xlsx');
        "Export succesfuly";
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'Status' => 'required',
        ]);
        $user = User::find($id);
        $user->update($request->all());
        return $user;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
