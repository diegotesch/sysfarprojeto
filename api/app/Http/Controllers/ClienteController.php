<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;
use App\Http\Resources\ClienteDTO;

class ClienteController extends Controller
{

    public function index(Request $request)
    {
        $query = Cliente::query();

        if ($request->has('nome')) {
            $query->where('nome', 'LIKE', '%' . $request->nome . '%');
        }

        if ($request->has('data_nascimento')) {
            $query->where('data_nascimento', $request->data_nascimento);
        }

        $clientes = $query->paginate();

        return response([
            $clientes
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
