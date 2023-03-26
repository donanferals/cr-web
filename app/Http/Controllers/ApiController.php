<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

class ApiController extends Controller
{
    public function getProdutos(Request $request) {
        $query = $request['query'] ?? '';
        $perPage = $request['perPage'] ?? 20;
        $response = Http::get("https://api.chicorei.com/products/v4/search?query=$query&perPage=$perPage");
        return response($response, 200);
    }

    public function getProduto(Request $request) {
        // logic to get all students goes here
    }
}
