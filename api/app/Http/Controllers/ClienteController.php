<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Http\Controllers\BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ClienteDTO;
use Carbon\Carbon;

class ClienteController extends BaseController
{

    public function index(Request $request)
    {
        $query = Cliente::query();

        if ($request->has('nome')) {
            $query->where('nome', 'LIKE', '%'.$request->nome.'%');
        }

        if ($request->has('data_nascimento')) {
            $query->where('data_nascimento', $request->data_nascimento);
        }

        $clientes = $query->get();

        return response([
            $clientes
        ], 200);
    }

    public function store(Request $request)
    {
        $dados = $request->all();

        $validator = Validator::make($dados, [
            'nome'  => 'required|min:3',
            'email' => 'required|email'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Dados inválidos.', $validator->errors());
        }

        if ($dados['data_nascimento']) {
            $dados['data_nascimento'] = Carbon::parse($dados['data_nascimento']);
        }

        $cliente = Cliente::create($dados);

        return $this->sendResponse(new ClienteDTO($cliente), 'Cliente cadastrado com sucesso!', 201);
    }

    public function show($id)
    {
        $cliente = Cliente::find($id);

        if (!$cliente) {
            return $this->sendError('Cliente não encontrado', 404);
        }

        return $this->sendResponse(new ClienteDTO($cliente), 'Cliente recuperado com sucesso!');
    }

    public function update(Request $request)
    {
        $dados = $request->all();
        $cliente = Cliente::findOrFail($dados['id']);

        $validator = Validator::make($dados, [
            'nome'  => 'required|min:3',
            'email' => 'required|email'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Dados inválidos.', $validator->errors());
        }

        if ($dados['data_nascimento']) {
            $dados['data_nascimento'] = Carbon::parse($dados['data_nascimento']);
        }

        $cliente->update($dados);
        return $this->sendResponse(new ClienteDTO($cliente), 'Cliente atualizado com sucesso!');
    }

    public function destroy(Cliente $cliente)
    {
        $cliente->delete();

        return $this->sendResponse([], 'Cliente removido com sucesso!', 204);
    }
}
