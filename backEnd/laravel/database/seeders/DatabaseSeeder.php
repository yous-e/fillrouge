<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Transaction;
use App\Models\Score;
use App\Models\Report;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // إضافة Admin
        $this->call(AdminSeeder::class);

        // إنشاء 10 مستخدمين مع بيانات تجريبية
        User::factory(10)
            ->has(Transaction::factory()->count(5)) // كل مستخدم عنده 5 معاملات
            ->has(Score::factory()->count(3))       // كل مستخدم عنده 3 Scores
            ->has(Report::factory()->count(2))      // كل مستخدم عنده 2 تقارير
            ->create();
    }
}
