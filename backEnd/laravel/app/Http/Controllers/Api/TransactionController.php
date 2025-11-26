<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Auth::user()->transactions;
        return response()->json(['transactions' => $transactions]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'type' => 'required|in:revenu,depense,dette',
            'amount' => 'required|numeric',
            'category' => 'required|string',
            'date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $transaction = new Transaction();
        $transaction->type = $request->type;
        $transaction->montant = $request->amount;
        $transaction->categorie = $request->category;
        $transaction->date = $request->date;
        $transaction->user_id = Auth::id();
        $transaction->save();

        return response()->json(['message' => 'Transaction created successfully'], 201);
    }

    public function show($id)
    {
        $transaction = Transaction::findOrFail($id);

        if ($transaction->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json(['transaction' => $transaction]);
    }

    public function update(Request $request, $id)
    {
        $transaction = Transaction::findOrFail($id);

        if ($transaction->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $transaction->type = $request->type ?? $transaction->type;
        $transaction->montant = $request->amount ?? $transaction->montant;
        $transaction->categorie = $request->category ?? $transaction->categorie;
        $transaction->date = $request->date ?? $transaction->date;
        $transaction->save();

        return response()->json(['message' => 'Transaction updated successfully'], 200);
    }

    public function destroy($id)
    {
        $transaction = Transaction::findOrFail($id);

        if ($transaction->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $transaction->delete();
        return response()->json(['message' => 'Transaction deleted successfully'], 200);
    }
}