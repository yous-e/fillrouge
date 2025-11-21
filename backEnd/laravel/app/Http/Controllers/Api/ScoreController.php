<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;

class ScoreController extends Controller
{
    /**
     * Calculate the user's financial score in real-time.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function calculate()
    {
        // Retrieve the authenticated user's transactions
        $transactions = Auth::user()->transactions;

        // Calculate the score
        $score = $this->calculateScore($transactions);

        // Return the score
        return response()->json(['score' => $score]);
    }

    /**
     * Display the history of calculated scores.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function history()
    {
        // Retrieve the authenticated user's transactions
        $transactions = Auth::user()->transactions;

        // Calculate the scores for each transaction
        $scores = $this->calculateScores($transactions);

        // Return the scores history
        return response()->json(['scores' => $scores]);
    }

    /**
     * Display the latest score of the user.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show()
    {
        // Retrieve the authenticated user's transactions
        $transactions = Auth::user()->transactions;

        // Calculate the latest score
        $score = $this->calculateLatestScore($transactions);

        // Return the latest score
        return response()->json(['score' => $score]);
    }

    /**
     * Calculate the financial score in real-time.
     *
     * @param  \Illuminate\Support\Collection  $transactions
     * @return float
     */
    protected function calculateScore($transactions)
    {
        // Your score calculation logic here
        // Example:
        $totalIncome = $transactions->sum('amount');
        $totalExpense = $transactions->where('type', 'expense')->sum('amount');
        $score = $totalIncome - $totalExpense;

        return $score;
    }

    /**
     * Calculate the scores for each transaction.
     *
     * @param  \Illuminate\Support\Collection  $transactions
     * @return array
     */
    protected function calculateScores($transactions)
    {
        // Your score calculation logic here
        // Example:
        $scores = [];
        foreach ($transactions as $transaction) {
            $score = $this->calculateScore(collect([$transaction]));
            $scores[] = $score;
        }

        return $scores;
    }

    /**
     * Calculate the latest score.
     *
     * @param  \Illuminate\Support\Collection  $transactions
     * @return float
     */
    protected function calculateLatestScore($transactions)
    {
        // Your score calculation logic here
        // Example:
        $latestTransaction = $transactions->last();

        if (is_null($latestTransaction)) {
            return 0;
        }

        $score = $this->calculateScore(collect([$latestTransaction]));

        return $score;
    }
}
