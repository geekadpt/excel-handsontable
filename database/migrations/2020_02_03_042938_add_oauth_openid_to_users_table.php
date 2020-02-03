<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddOauthOpenidToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            //
            $table->string('provider')->nullable()->after('password');;
            $table->string('provider_id')->unique()->nullable()->after('provider');
            $table->text('avatar')->nullable()->after('name');
            $table->string('password')->nullable()->change();
            $table->string('introduction')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            //
            $table->dropColumn('provider');
            $table->dropColumn('provider_id');
            $table->dropColumn('avatar');
            $table->dropColumn('introduction');
            $table->string('password')->nullable(false)->change();
        });
    }

}
