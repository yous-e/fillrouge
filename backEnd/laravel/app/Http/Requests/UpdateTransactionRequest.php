<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTransactionRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'type' => 'sometimes|in:revenu,depense,dette',
            'montant' => 'sometimes|numeric|min:0',
            'date' => 'sometimes|date',
            'categorie' => 'sometimes|string|max:100',
        ];
    }
}
