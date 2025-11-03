<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(string $quiz_id)
    {
        return Inertia::render('question/create', [
            'quiz_id' => $quiz_id
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, string $quiz_id)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'content'  => 'string|required',
            'quiz_id' => 'string|required',
            'type' => 'in:choice,essai|required',
            'answer' => 'string|required',
            'options' => 'string'
        ]);
        

        $question = Question::create($data);
        $question_id = $question->id;
        return redirect()->route('question.show', [
            'quiz_id' => $quiz_id,
            'question_id' => $question_id
        ])->with('success', 'Question created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $quiz_id, string $question_id)
    {
        $question = Question::findOrFail($question_id);

        return Inertia::render('question/show', [
            'quiz_id' => $quiz_id,
            'question' => $question,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Question $question)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Question $question)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Question $question)
    {
        //
    }
}
