<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTransactionRequest extends FormRequest
{
    public function authorize()
    {
        return true; // ou ajouter une logique si besoin
    }

    public function rules()
    {
        return [
            'type' => 'required|in:revenu,depense,dette',
            'montant' => 'required|numeric|min:0',
            'date' => 'required|date',
            'categorie' => 'required|string|max:100',
        ];
    }
}
