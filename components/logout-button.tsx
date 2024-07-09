// components/LogoutButton.tsx
"use client";

import { logout } from "@/app/actions/logout";
import { useAuth } from "@/app/contexts/AuthContext";

export function LogoutButton() {
    const { setIsAuthenticated } = useAuth();

    const handleLogout = async () => {
        logout();
        setIsAuthenticated(false);
    };

    return (
        <button
            onClick={handleLogout}
            className='bg-background shadow-sm  text-foreground font-bold py-2 px-4 rounded border-2'>
            Logout
        </button>
    );
}
