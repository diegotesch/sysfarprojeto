<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ClientTest extends TestCase
{

    public function testListar()
    {

        $response = $this->json('GET', '/cliente')
            ->assertStatus(200)
            ->assertJsonStructure([
                '*' => [
                    'id',
                    'nome',
                    'email',
                    'telefone',
                    'data_nascimento',
                    'created_at',
                    'updated_at'
                    ]
            ]);
    }
}
