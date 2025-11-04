import { Table, TableCard } from "@/components/application/table/table";
import MagixTable from "@/components/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { dashboard } from "@/routes";
import { create, show } from "@/routes/question";
import { BreadcrumbItem } from "@/types";
import { Head, router } from "@inertiajs/react";

export default function ShowQuiz({ quiz }: { quiz: {} }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: dashboard().url,
        },
        {
            title: 'Quiz',
            href: '#',
        },
        {
            title: quiz.id,
            href: '#',
        }

    ];
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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={quizName} />
            <div className="p-3">
                <Card>
                    <CardContent className="flex flex-col gap-y-4">
                        <div className="flex justify-between items-center">
                            <CardTitle>
                                {quizName}
                            </CardTitle>
                            <Button onClick={onClickCreate}>
                                Create Question
                            </Button>
                        </div>
                        <div>
                            {isHaveQuestions ? (
                                <QuestionList onClickItem={showQuestion} questions={questions} />
                            ) : (
                                <p>You dont have questions</p>
                            )}
                        </div>

                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}

function QuestionList({ questions, onClickItem }: { questions: [], onClickItem: (questionId: string) => void; }) {
    return (
        <div>
            <MagixTable
                items={questions}
                columns={[
                    {
                        key: 'title',
                        title: 'Title',
                    },
                    {
                        key: 'type',
                        title: 'Type',
                    },
                ]}
                onRowClick={(item) => onClickItem(item.id)}
                rowKey={(item) => item.id}
            />

        </div >
    )
}