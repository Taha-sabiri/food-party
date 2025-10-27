/* eslint-disable */

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import emoj from '@/assets/images/emoj2.png'
import { Button } from "@/components/ui/button";
import z from "zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";


export default function Splash() {

    const [loading, setLoading] = useState(false)
    

    const router = useRouter();

    const schema = z.object({
        user: z.string().nonempty(" فیلد اجباری است"),
        pass: z.string().nonempty("فیلد اجباری است"),

    });

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: { user: "", pass: "", },
    });


    const onSubmit = async (values: z.infer<typeof schema>) => {
        setLoading(true);
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "email": values.user,
                "password": values.pass
            }),
        });
        setLoading(false);

        if (res.ok) {
            toast.success("خوش آمدید")
            router.replace('/dashboard/admin')
            setLoading(false)
        } else {
            toast.error("نام کاربری یا رمز عبور شما اشتباه است")
            setLoading(false)

        }
    };

    return (
        <div className="flex flex-col  min-h-screen justify-center items-center w-full relative bg-yellow-400  max-w-2xl ">
            <div className=" flex justify-center items-center absolute top-[25svh]">
                <Image className="absolute mb-20 z-0" src={emoj} alt="logo" width={100} priority={true} />
                <span className="text-white font-black text-4xl z-10">فود پارتی</span>

            </div>

            <div className="flex w-full flex-col gap-2 absolute bottom-0 p-10 bg-white  rounded-t-2xl">
                <span className="font-bold text-2xl">ورود به فود پارتی</span>
                <span className="text-stone-600">نام کاربری و رمز عبود خود را وارد کنید</span>

                < Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 mt-4">
                        <FormField
                            control={form.control}
                            name="user"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>نام کاربری</FormLabel>
                                    <FormControl>
                                        <Input inputMode="email" placeholder="نام کاربری را وارد کنید" type="text" {...field}  />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="pass"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>رمز عبور</FormLabel>
                                    <FormControl>
                                        <Input inputMode="text" placeholder="رمز عبور را وارد کنید" type="password" {...field} maxLength={11} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <Button type="submit" className="mt-10 " >
                            {loading ? "شکیبا باشید ..." : "ورود"}
                        </Button>
                        <Button variant={"outline"} className="" onClick={() => { router.replace('/dashboard/home') }}>
                            ورود به عنوان مهمان
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}