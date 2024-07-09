// app/protected/page.tsx
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/app/lib/prisma";
import { LogoutButton } from "@/components/logout-button"; // Adjust this import based on your Prisma client location

async function getUserData(userId: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                firstname: true,
                lastname: true,
            },
        });
        return user;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}

export default async function ProtectedPage() {
    const headersList = headers();
    const userId = headersList.get("x-user-id");

    if (!userId) {
        redirect("/login");
    }

    const user = await getUserData(userId);

    if (!user) {
        // Handle the case where user data couldn't be fetched
        return (
            <div>
                <h1>Error</h1>
                <p>Unable to fetch user data. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className='flex-1 container mx-auto p-4 flex flex-col justify-center items-center relative bg-background text-foreground'>
            <div className=' px-8 pt-6 pb-8 mb-4 w-full md:max-w-[550px] z-10 rounded-lg border bg-card text-card-foreground shadow-sm '>
                <h2 className='text-xl font-semibold mb-2'>User Information</h2>
                <div className='space-y-6'>
                    <p>
                        <strong>User ID:</strong> {user.id}
                    </p>
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                        <strong>Name:</strong> {user.firstname} {user.lastname}
                    </p>
                    <LogoutButton />
                </div>
            </div>
            <div className='absolute right-[10px] top-0 h-[300px] w-[300px] bg-orange-600 blur-[190px]'></div>
            <div className='absolute left-[10px] bottom-0 h-[300px] w-[300px] bg-purple-600 blur-[190px]'></div>
        </div>
    );
}
