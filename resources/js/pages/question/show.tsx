import { Card, CardContent, CardTitle } from "@/components/ui/card"
import AppLayout from "@/layouts/app-layout"
import { dashboard } from "@/routes";
import { show } from "@/routes/quiz";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react"

export default function ShowQuestion({ question }: { question: {} }) {
    const quizId = question.quiz_id
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
            title: quizId,
            href: show({ id: quizId }).url,
        },
        {
            title: 'Question',
            href: show({ id: quizId }).url,
        },
        {
            title: question.id,
            href: '#',
        }
    ];
    const questionTitle = question.title
    const questionContent = question.content
    const questionAnswer = question.answer
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={questionTitle} />
            <div className="p-3">
                <Card>
                    <CardContent className="flex flex-col gap-y-4">
                        <div>
                            <CardTitle>Title</CardTitle>
                            <p>{questionTitle}</p>
                        </div>
                        <div>
                            <CardTitle>Question</CardTitle>
                            <p>{questionContent}</p>
                        </div>
                        <div>
                            <CardTitle>Answer</CardTitle>
                            <p>{questionAnswer}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}