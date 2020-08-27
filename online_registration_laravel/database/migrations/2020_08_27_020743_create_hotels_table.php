<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHotelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hotels', function (Blueprint $table) {
            $table->increments('User_ID');
            $table->string('Check_In', 50);
            $table->string('Check_Out', 50);
            $table->string('Partner_Name', 50)->nullable();
            $table->string('Partner_Province', 50)->nullable();
            $table->string('Room_Number', 10)->nullable();
            $table->string('Note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('hotels');
    }
}
