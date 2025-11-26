<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Report;
use Illuminate\Support\Facades\Auth;

class ReportController extends Controller
{
    public function generateReport(Request $request)
    {
        $user = Auth::user();
        
        $report = Report::create([
            'user_id' => $user->id,
            'fichier_pdf' => 'report_' . time() . '.pdf',
            'date_export' => now(),
        ]);

        return response()->json([
            'message' => 'Report generated successfully',
            'report' => $report
        ]);
    }

    public function getUserReports()
    {
        $reports = Auth::user()->reports()->latest()->get();
        return response()->json(['reports' => $reports]);
    }

    public function download($id)
    {
        $report = Report::where('user_id', Auth::id())->findOrFail($id);
        
        return response()->json([
            'message' => 'Downloading report',
            'file' => $report->fichier_pdf,
            'url' => '/reports/' . $report->fichier_pdf
        ]);
    }
}