// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    const protectedPaths = ["/dashboard", "/profile", "/orders"];
    const authPaths = ["/login", "/register"];

    const isProtectedPath = protectedPaths.some((path) =>
        request.nextUrl.pathname.startsWith(path)
    );
    const isAuthPath = authPaths.some((path) => request.nextUrl.pathname.startsWith(path));

    if (isProtectedPath) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        try {
            // Verify the token using jose
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            const { payload } = await jwtVerify(token, secret);

            // Add user info to headers so it can be accessed in Server Components
            const requestHeaders = new Headers(request.headers);
            requestHeaders.set("x-user-id", payload.userId as string);

            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            });
        } catch (error) {
            // Token is invalid, redirect to login
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    if (isAuthPath && token) {
        try {
            // Verify the token
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            await jwtVerify(token, secret);

            // If token is valid, redirect to dashboard
            return NextResponse.redirect(new URL("/profile", request.url));
        } catch (error) {
            // If token is invalid, remove it and proceed to auth page
            const response = NextResponse.next();
            response.cookies.delete("token");
            return response;
        }
    }

    // For non-protected routes, just proceed
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*", "/orders/:path*", "/login", "/register"],
};
