<?php

namespace App\Policies;

use App\Models\Table;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TablePolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }
    public function update(User $user, Table $table)
    {
        return $user->id == $table->user_id;
    }

    public function destroy(User $user, Table $table)
    {
        return $user->id == $table->user_id;
    }
}
