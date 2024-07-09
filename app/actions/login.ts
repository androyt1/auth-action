"use server";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

type State = {
    message: string | null;
    error: string | null;
    success: boolean;
};

const login = async (prevState: State, formData: FormData): Promise<State> => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { message: null, error: "All fields are required", success: false };
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return { message: null, error: "User does not exist", success: false };
        }
        const passwordCorrect = await bcrypt.compare(password, user.password);
        if (!passwordCorrect) {
            return { message: null, error: "Incorrect password", success: false };
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
        const token = await new SignJWT({ userId: user.id })
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("1h")
            .sign(secret);
        // Set the token as a cookie
        cookies().set({
            name: "token",
            value: token,
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60, // 1 hour in seconds
        });
        return { message: "Login successful", error: null, success: true };
    } catch (error) {
        console.error(error);
        return { message: null, error: "Failed to login user", success: false };
    }
};
export default login;
