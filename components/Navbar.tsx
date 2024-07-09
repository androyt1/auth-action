// components/Navbar.tsx
"use client";

import Link from "next/link";
import { ModeToggle } from "./toggle-mode";
import { useAuth } from "@/app/contexts/AuthContext";
import { LogoutButton } from "./logout-button";

const Navbar = () => {
    const { isAuthenticated } = useAuth();

    return (
        <nav className='h-20 border-b-2 flex items-center justify-between px-3 md:px-6 backdrop-blur-2xl sticky top-0 z-10 bg-background text-foreground'>
            <Link href='/' className='text-3xl'>
                toy
            </Link>
            <ul className='flex items-center gap-x-4'>
                {!isAuthenticated ? (
                    <>
                        <li>
                            <Link href='/login'>Login</Link>
                        </li>
                        <li>
                            <Link href='/register'>Register</Link>
                        </li>
                    </>
                ) : (
                    <li>
                        <LogoutButton />
                    </li>
                )}
                <li>
                    <ModeToggle />
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
