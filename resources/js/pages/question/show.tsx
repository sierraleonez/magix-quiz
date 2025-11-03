import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"

export default function ShowQuestion({ question }: { question: {} }) {
    
    const questionTitle = question.title

    return (
        <AppLayout>
            <Head title={questionTitle} />
            <div>
                <h1>{questionTitle}</h1>
            </div>
        </AppLayout>
    )
}