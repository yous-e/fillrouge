<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Transaction;
use App\Models\Score;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->middleware('isAdmin');
    }

    public function listUsers()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'Utilisateur supprimé avec succès']);
    }

    public function stats()
    {
        $totalUsers = User::count();
        $totalTransactions = Transaction::count();
        $averageScore = Score::avg('valeur');

        return response()->json([
            'total_users' => $totalUsers,
            'total_transactions' => $totalTransactions,
            'average_score' => round($averageScore, 2)
        ]);
    }

    public function assignRole(Request $request, $userId)
    {
        $request->validate([
            'role' => 'required|in:user,admin'
        ]);

        $user = User::findOrFail($userId);
        $user->role = $request->role;
        $user->save();

        return response()->json([
            'message' => "Rôle attribué avec succès",
            'user' => $user
        ]);
    }
}