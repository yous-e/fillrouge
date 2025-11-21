<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ReportFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'fichier_pdf' => $this->faker->word() . '.pdf',
            'date_export' => $this->faker->dateTime(),
        ];
    }
}
