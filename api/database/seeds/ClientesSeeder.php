<?php

use App\Models\Cliente;
use Illuminate\Database\Seeder;

class ClientesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

        for($i = 0; $i < 20; $i++){
            $phone = rand(10, 11);
            Cliente::create([
                'nome' => $faker->name,
                'email' => $faker->email,
                'telefone' => $phone,
                'data_nascimento' => $faker->date()
            ]);
        }
    }
}
