import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { create, show } from '@/routes/quiz';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ quizzes }: { quizzes: Array<any> }) {
    const isQuizEmpty = quizzes.length === 0
    function onClickCreate() {
        router.visit(create())
    }

    function onClickQuiz(quizId: string) {
        router.visit(show({ id: quizId }))
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className='p-3'>
                <Card>
                    <CardContent className='flex flex-col gap-y-4'>
                        <div className='flex justify-between items-center'>
                            <CardTitle>Quiz</CardTitle>
                            <Button onClick={onClickCreate}>
                                Create
                            </Button>
                        </div>
                        {isQuizEmpty ? (
                            <p>No Quiz found</p>
                        ) : (
                            <ul className='flex flex-col gap-y-2'>
                                {quizzes.map((quiz) => (
                                    <li className='hover:cursor-pointer' onClick={() => onClickQuiz(quiz.id)} key={quiz.id}>
                                        <Card className='px-3 py-3'>
                                            {quiz.quiz_name}
                                        </Card>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
