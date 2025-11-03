<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $user_id = $user->id;

        $quizzes = Quiz::where('user_id', $user_id)->get();

        return Inertia::render('dashboard', [
            'quizzes' => $quizzes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *  payload: [ { 'quiz_name': { required: true, type: 'string' } } ]
     */
    public function create()
    {
        return Inertia::render('quiz/create');
    }

    /**
     * Store a newly created resource in storage.
     * payload: [ { 'quiz_name': { required: true, type: 'string' } } ]
     * on success: redirect to show quiz
     */
    public function store(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'quiz_name' => ['required', 'string', 'max:255'],
        ]);

        $quiz = Quiz::create([
            'user_id'   => $user->id,
            'quiz_name' => $validated['quiz_name'],
        ]);

        $quiz_id = $quiz->id;
        return redirect()->route('quiz.show', $quiz_id);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $quiz = Quiz::find($id)->load('questions');
        return Inertia::render('quiz/show', [
            'quiz' => $quiz
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Quiz $quiz)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Quiz $quiz)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quiz $quiz)
    {
        //
    }
}
