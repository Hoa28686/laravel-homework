<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NameColor;
use App\Models\Word;
use Illuminate\Http\Request;

class WordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Word::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Word $word)
    {
        $validated = $request->validate([
            'finnish' => 'required|string',
            'english' => 'required|string',
            'example' => 'nullable|string'
        ]);
        $word = Word::create($validated);
        return response()->json($word, 201);
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Word::findOrFail($id);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'finnish' => 'required|string',
            'english' => 'required|string',
            'example' => 'nullable|string'
        ]);
        $word = Word::findOrFail($id);
        $word->update($validated);

        return response()->json($word);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($finnish)
    {
        $word = Word::where('finnish', $finnish)->first();
        $word->delete();
        return response()->json(null, 204);
    }
}
