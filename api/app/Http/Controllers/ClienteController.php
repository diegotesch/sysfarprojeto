<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;
use App\Http\Resources\ClienteDTO;

class ClienteController extends Controller
{

    public function index()
    {
        $clientes = Cliente::all();
        return response([
            'clientes' => ClienteDTO::collection($clientes),
            'message' => 'Clientes listados com sucesso'
        ], 200);
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Cliente $cliente)
    {
        //
    }

    public function update(Request $request, Cliente $cliente)
    {
        //
    }

    public function destroy(Cliente $cliente)
    {
        //
    }
}
