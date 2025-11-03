import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { create, show } from "@/routes/question";
import { Head, router } from "@inertiajs/react";

export default function ShowQuiz({ quiz }: { quiz: {} }) {
    
    const quizName = quiz.quiz_name
    const questions = quiz.questions
    const isHaveQuestions = questions.length > 0

    function onClickCreate() {
        router.visit(create(quiz.id))
    }

    function showQuestion(questionId: string) {
        router.visit(show({
            question_id: questionId,
            quiz_id: quiz.id
        }))
    }

    return (
        <AppLayout>
            <Head title={quizName} />
            <div className="p-3">
                <Card>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <CardTitle>
                                {quizName}
                            </CardTitle>
                            <Button onClick={onClickCreate }>
                                Create Question
                            </Button>
                        </div>
                        <div>
                            {isHaveQuestions ? (
                                <QuestionList onClickItem={showQuestion} questions={questions} />
                            ): (
                                <p>You dont have questions</p>
                            )}
                        </div>

                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}

function QuestionList({questions, onClickItem}: { questions: [], onClickItem: (questionId: string) => void; }) {
    return (
        <div>
            <ul>
                {
                    questions.map((question) => {
                        return (
                            <li className="hover:cursor-pointer" onClick={() => onClickItem(question.id)} key={`question-${question.id}`}>
                                <Card className="p-3">
                                    {question.title}
                                </Card>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}