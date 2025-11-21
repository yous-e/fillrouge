<?php 
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
class TransactionController extends Controller
{
    /**
     * Display a listing of the user's transactions.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Retrieve the authenticated user's transactions
        $transactions = Auth::user()->transactions;

        // Return the transactions
        return response()->json(['transactions' => $transactions]);
    }

    /**
     * Store a newly created transaction in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'type' => 'required|string',
            'amount' => 'required|numeric',
            'category' => 'required|string',
            'date' => 'required|date',
        ]);

        // Return validation errors if any
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Create a new transaction
        $transaction = new Transaction();
        $transaction->type = $request->type;
        $transaction->amount = $request->amount;
        $transaction->category = $request->category;
        $transaction->date = $request->date;
        $transaction->user_id = Auth::id();
        $transaction->save();

        // Return a success response
        return response()->json(['message' => 'Transaction created successfully'], 201);
    }

    /**
     * Update the specified transaction in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        // Find the transaction by ID
        $transaction = Transaction::findOrFail($id);

        // Check if the authenticated user is the owner of the transaction
        if ($transaction->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Update the transaction data
        $transaction->type = $request->type ?? $transaction->type;
        $transaction->amount = $request->amount ?? $transaction->amount;
        $transaction->category = $request->category ?? $transaction->category;
        $transaction->date = $request->date ?? $transaction->date;
        $transaction->save();

        // Return a success response
        return response()->json(['message' => 'Transaction updated successfully'], 200);
    }

    /**
     * Remove the specified transaction from the database.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        // Find the transaction by ID
        $transaction = Transaction::findOrFail($id);

        // Check if the authenticated user is the owner of the transaction
        if ($transaction->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Delete the transaction
        $transaction->delete();

        // Return a success response
        return response()->json(['message' => 'Transaction deleted successfully'], 200);
    }
  
    /**
     * Display the specified transaction.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        // Find the transaction by ID
        $transaction = Transaction::findOrFail($id);

        // Check if the authenticated user is the owner of the transaction
        if ($transaction->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 401
        );
        }

        // Return the transaction
        return response()->json(['transaction' => $transaction]);
    }
}