<?php

use App\Http\Controllers\QuestionController;
use App\Http\Controllers\QuizController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [QuizController::class, 'index'])->name('dashboard');
    Route::prefix('/quiz')->group(function() {
        Route::get('/create', [QuizController::class, 'create'])->name('quiz.create');
        Route::post('/store', [QuizController::class, 'store'])->name('quiz.store');
        Route::get('{id}', [QuizController::class, 'show'])->name('quiz.show');

        Route::prefix('/{quiz_id}/question')->group(function() {
            Route::get('/create', [QuestionController::class, 'create'])->name('question.create');
            Route::post('/', [QuestionController::class, 'store'])->name('question.store');
            Route::get('/{question_id}', [QuestionController::class, 'show'])->name('question.show');
        });
    });
});

require __DIR__ . '/settings.php';
