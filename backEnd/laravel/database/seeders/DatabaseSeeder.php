<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(AdminSeeder::class);

        User::factory(10)->create()->each(function ($user) {
            \App\Models\Transaction::factory(5)->create(['user_id' => $user->id]);
            \App\Models\Score::factory(3)->create(['user_id' => $user->id]);
            \App\Models\Report::factory(2)->create(['user_id' => $user->id]);
        });
    }
}