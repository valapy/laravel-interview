<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TodoController extends Controller
{
    /**
     * GET /api/todos
     */
    public function index(): JsonResponse
    {
        $todos = Todo::orderBy('created_at', 'desc')->get();
        return response()->json($todos);
    }

    /**
     * POST /api/todos
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'content' => 'required|string|max:255',
            'status' => 'boolean',
        ]);

        $todo = Todo::create([
            'content' => $validated['content'],
            'status' => $validated['status'] ?? false,
        ]);

        return response()->json($todo, 201);
    }

    /**
     * PUT /api/todos/{id}
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $todo = Todo::findOrFail($id);

        $validated = $request->validate([
            'content' => 'sometimes|required|string|max:255',
            'status' => 'sometimes|required|boolean',
        ]);

        $todo->update($validated);

        return response()->json($todo);
    }

    /**
     * DELETE /api/todos/{id}
     */
    public function destroy(string $id): JsonResponse
    {
        $todo = Todo::findOrFail($id);
        $todo->delete();

        return response()->json(null, 204);
    }
}
