import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AppLayout from "@/layouts/app-layout";
import { store } from "@/routes/question";
import { Form, Head } from "@inertiajs/react";
import { toast } from "react-toastify";

export default function CreateQuestionForm({ quiz_id }: { quiz_id: string }) {
    return (
        <AppLayout>
            <Head title="Create Question" />
            <div className="p-4">
                <Card>
                    <CardContent className="flex flex-col gap-y-3">
                        <CardTitle>
                            Create Question
                        </CardTitle>
                        <Form
                            className="flex flex-col gap-y-3"
                            method="post"
                            onError={(err) => {
                                const t = Object.values(err).join(", ");
                                toast.error(t);
                            }}
                            action={store({ quiz_id })}
                            transform={(data) => ({
                                ...data,
                                quiz_id,
                                type: 'essai',
                                options: '[]',
                            })}
                        >
                            <Input placeholder="Title" name="title" />
                            <Input placeholder="Content" name="content" />
                            <Input placeholder="Answer" name="answer" />
                            <Button>
                                Submit
                            </Button>
                        </Form>
                    </CardContent>

                </Card>
            </div>
        </AppLayout>
    )
}