// components/AuthStatus.tsx
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

async function getAuthStatus() {
    const token = cookies().get("token")?.value;

    if (!token) {
        return false;
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(token, secret);
        return true;
    } catch (error) {
        return false;
    }
}

export default async function AuthStatus() {
    const isAuthenticated = await getAuthStatus();

    return <span data-auth-status={isAuthenticated ? "authenticated" : "unauthenticated"} />;
}
