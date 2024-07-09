"use client";
import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import login from "@/app/actions/login";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

const LoginButton = () => {
    const { pending } = useFormStatus();
    return (
        <Button className='' type='submit' disabled={pending}>
            {pending ? "Login ..." : "Login"}
        </Button>
    );
};

const LoginForm = () => {
    const router = useRouter();
    const { setIsAuthenticated } = useAuth();
    const initialState = { message: null, error: null, success: false };
    const [state, formAction] = useFormState(login, initialState);

    if (state.success) {
        setIsAuthenticated(true);
        router.push("/profile");
    }

    return (
        <Card className='w-full md:w-[650px] bg-background text-foreground z-10'>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Join us and start making money</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction} className='space-y-4'>
                    {state.error && <div className='text-red-500'>{state.error}</div>}

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
                    <LoginButton />
                </form>
            </CardContent>
        </Card>
    );
};

export default LoginForm;
