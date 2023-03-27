<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

class ApiController extends Controller
{
    public const API = 'https://chicorei.com/search?';

    public function getProdutos(Request $request) {

        $parametros = array(
            'query' => $request['query'],
            'per_page' => $request['per_page'] ?? 36,
            'page' => $request['page'] ?? 1,
            'tipo' => $request['tipo'] ?? 0,
            'json' => 1,
            'defaultGroup' => 1
        );

        //Tratar os tipos de produto
        //Se for CAMISETA (1) ou CAMISA (45) ou MOLETON (5) -> os filtros MODELAGEM, TAMANHO, COR e TEMA devem ser considerados
        
        //FIXME: trocar numeros por enums
        if ($request['tipo'] === '1' || $request['tipo'] === '45' || $request['tipo'] === '5') {
            $parametros += array(
                'modelagem' => $request['modelagem'] ?? '',
                'tamanho' => $request['tamanho'] ?? '',
                'cor' => $request['cor'] ?? '',
                'tema' => $request['tema'] ?? ''
            );
        } 
        //Se for BOLSA (25) => o filtro COR deve ser considerado
        else if ($request['tipo'] === '25') {
            $parametros += array(
                'cor' => $request['cor'] ?? ''                
            );
        }
        //Os demais (CANECA, POSTER CAPAS, SKETCHBOOK, MEIA, BANDEIRA DECORATIVA, MANGA LONGA)
        else {
            $parametros += array(
                'cor' => $request['cor'] ?? '',
                'tema' => $request['tema'] ?? ''             
            );
        }

        $response = Http::get(ApiController::API . http_build_query($parametros));
        return response($response, 200);
    }
}
