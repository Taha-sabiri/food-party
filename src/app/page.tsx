/* eslint-disable */

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import emoj from '@/assets/images/emoj2.png'
import { Button } from "@/components/ui/button";


export default function Splash() {



    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/auth/clear", { method: "POST" });
    };


    useEffect(() => {
        handleLogout()
    }, [router]);

    return (
        <div className="flex flex-col  min-h-screen justify-center items-center w-full relative bg-yellow-400  max-w-2xl ">
            <div className=" flex justify-center items-center">
                <Image className="absolute mb-20 z-0" src={emoj} alt="logo" width={100} priority={true} />
                <span className="text-white font-black text-4xl z-10">فود پارتی</span>

            </div>

            <div className="flex w-full flex-col gap-2 absolute bottom-10 p-4">

                <Button className="bg-black text-yellow-400" onClick={() => {
                    router.replace('/login')
                }}>ورود با کاربر</Button>
                <Button variant={"outline"} className="bg-transparent text-black border hover:bg-transparent" onClick={() => {
                    router.replace('/dashboard/home')
                }}>ورود به عنوان مهمان</Button>
            </div>
        </div>
    );
}