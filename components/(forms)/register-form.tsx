// app/components/RegisterForm.tsx
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { register } from "@/app/actions/register";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type='submit' disabled={pending}>
            {pending ? "Registering..." : "Register"}
        </Button>
    );
}

const RegisterForm = () => {
    const initialState = { message: null, error: null, success: false };
    const [state, formAction] = useFormState(register, initialState);
    const router = useRouter();

    if (state.success) {
        router.push("/login");
    }

    return (
        <Card className='w-full md:w-[650px] bg-background text-foreground z-10'>
            <CardHeader>
                <CardTitle>Register New User</CardTitle>
                <CardDescription>Join us and start making money</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction} className='space-y-4'>
                    {state.error && <div className='text-red-500'>{state.error}</div>}
                    <div className='grid grid-cols-1 md:grid-cols-2 w-full items-center gap-4'>
                        <div className='grid w-full items-center gap-4'>
                            <div className='flex flex-col space-y-1.5'>
                                <Label htmlFor='firstname'>Firstname</Label>
                                <Input
                                    id='firstname'
                                    name='firstname'
                                    placeholder='Enter Firstname'
                                    required
                                />
                            </div>
                        </div>
                        <div className='grid w-full items-center gap-4'>
                            <div className='flex flex-col space-y-1.5'>
                                <Label htmlFor='lastname'>Lastname</Label>
                                <Input
                                    id='lastname'
                                    name='lastname'
                                    placeholder='Enter Lastname'
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className='grid w-full items-center gap-4'>
                        <div className='flex flex-col space-y-1.5'>
                            <Label htmlFor='email'>Email</Label>
                            <Input
                                id='email'
                                name='email'
                                type='email'
                                placeholder='Enter Email'
                                required
                            />
                        </div>
                    </div>
                    <div className='grid w-full items-center gap-4'>
                        <div className='flex flex-col space-y-1.5'>
                            <Label htmlFor='password'>Password</Label>
                            <Input
                                id='password'
                                name='password'
                                type='password'
                                placeholder='Enter Password'
                                required
                                minLength={8}
                            />
                        </div>
                    </div>
                    <SubmitButton />
                </form>
            </CardContent>
        </Card>
    );
};

export default RegisterForm;
