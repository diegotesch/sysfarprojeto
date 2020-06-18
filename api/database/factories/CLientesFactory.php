<?php

use App\Models\Cliente;
use Faker\Generator as Faker;

$factory->define(Cliente::class, function (Faker $faker) {
    return [
        'nome'              => $faker->firstName . ' ' . $faker->lastName,
        'email'             => $faker->email,
        'data_nascimento'   => $faker->date(),
        'telefone'          => '2277112277',
    ];
});
