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
        return User::all();
    }

    public function usersTraining()
    {
        return DB::table('users')
                    ->select('users.User_ID','users.F_Name','users.L_Name','users.Province_ID','training.TISI','training.I_Factory','training.E_Payment')
                    ->join('training','training.User_ID','=','users.User_ID')
                    ->get();
    }

    public function usersHotel()
    {
        return DB::table('hotels')
                    ->leftjoin('users as u1','hotels.User_ID','=','u1.User_ID')
                    ->leftjoin('users as u2','hotels.Partner_ID','=','u2.User_ID')
                    ->select('u1.User_ID','u1.F_Name as F_1','u1.L_Name as L_1','u1.Province_ID','u2.F_Name as F_2','u2.L_Name as L_2','hotels.Check_In','hotels.Check_Out','hotels.Partner_ID','hotels.Room_Number','Note')
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
