import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AppLayout from "@/layouts/app-layout";
import { store } from "@/routes/quiz";
import { Form, Head } from "@inertiajs/react";
import { Box } from "lucide-react";
import { toast } from "react-toastify";

/**
 * Create quiz component, it should have an input for Quiz name
 * @returns 
 */
export default function CreateQuiz() {

    function onSuccess() {
        toast('Yey, quiz created')

    }
    return (
        <AppLayout>
            <Head title="Quiz" />
            <div className="p-4">
                <Card>
                    <CardContent className="flex flex-col gap-y-3">
                        <CardTitle>Create Quiz</CardTitle>
                        <Form onSuccess={onSuccess} className="space-y-3" action={store()} method="post">
                            <Input placeholder="Quiz Name" name="quiz_name" />
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