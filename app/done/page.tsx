"use client";

import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

const DonePage = () => {
    return (
        <div className='bg-[#152242] min-h-screen flex flex-col items-center justify-center'>
            <Confetti className='max-w-full' />
            <h1 className='text-4xl my-6 font-bold text-white text-center'>
                Thank you for using Carpata!
            </h1>
            <button
                onClick={() => redirect("/")}
                className='cursor-pointer underline'>
                Back to Home
            </button>
        </div>
    );
};

export default DonePage;
