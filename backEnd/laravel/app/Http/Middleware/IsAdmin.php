<?php



namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class IsAdmin
{
    /**
     * Vérifie si l'utilisateur connecté est un admin
     */
    public function handle(Request $request, Closure $next)
    {
        // Vérifie si l'utilisateur est connecté et a le rôle "admin"
        if ($request->user() && $request->user()->role === 'admin') {
            return $next($request);
        }

        // Sinon, on bloque l'accès
        return response()->json([
            'error' => 'Accès refusé. Vous devez être administrateur.'
        ], 403);
    }
}

