<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ScoreFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'valeur' => $this->faker->numberBetween(0, 100),
            'couleur' => $this->faker->randomElement(['green', 'yellow', 'red']),
            'date_calcul' => $this->faker->dateTime(),
        ];
    }
}