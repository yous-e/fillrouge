<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TransactionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'type' => $this->faker->randomElement(['revenu', 'depense', 'dette']),
            'montant' => $this->faker->numberBetween(50, 5000),
            'date' => $this->faker->date(),
            'categorie' => $this->faker->word(),
        ];
    }
}