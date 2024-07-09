// app/actions/auth.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
    // Clear the token cookie
    cookies().delete("token");

    // Redirect to the login page or home page
    redirect("/login");
}
