import LoginForm from "@/components/(forms)/login-form";

const page = () => {
    return (
        <div className='flex-1 flex flex-col justify-center items-center px-3 md:px-6 relative bg-background'>
            <div className='absolute -top-5 -left-20 w-[300px] h-[300px] bg-red-600  rounded-full blur-[150px]'></div>
            <LoginForm />
        </div>
    );
};

export default page;
