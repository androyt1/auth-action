// app/actions/register.ts

"use server";

import prisma from "@/app/lib/prisma";
import bcrypt from "bcrypt";

type State = {
    message: string | null;
    error: string | null;
    success: boolean;
};

export async function register(prevState: State, formData: FormData): Promise<State> {
    const firstname = formData.get("firstname") as string;
    const lastname = formData.get("lastname") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!firstname || !lastname || !email || !password) {
        return { message: null, error: "All fields are required", success: false };
    }

    if (password.length < 8) {
        return {
            message: null,
            error: "Password must be at least 8 characters long",
            success: false,
        };
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return { message: null, error: "User already exists", success: false };
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {
                firstname,
                lastname,
                email,
                password: hashedPassword,
            },
        });
        return { message: "Registered successfully", error: null, success: true };
    } catch (error) {
        console.error(error);
        return { message: null, error: "Failed to register user", success: false };
    }
}
