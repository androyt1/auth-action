import RegisterForm from "@/components/(forms)/register-form";

const page = () => {
    return (
        <div className='flex-1 flex flex-col pt-10 md:pt-0 justify-start md:justify-center items-center px-3 md:px-6 relative bg-background'>
            <div className='absolute -top-5 -left-20 w-[300px] h-[300px] bg-blue-600  rounded-full blur-[150px]'></div>
            <RegisterForm />
        </div>
    );
};

export default page;
