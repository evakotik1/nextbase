"use client";

import { authClient } from "@/src/lib/client/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z, { email } from "zod/v4";    

export default function SignIn() {

const formSchema = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(8, "Password is required"),
});

const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {} as z.infer<typeof formSchema>,
});

const onFormSubmit = async (data: z.infer<typeof formSchema>) => {
    await authClient.signIn.email({
        email: data.email,
        password: data.password
    },
    {
        onSuccess: () => {
        alert("Вход выполнен!");
        window.location.href = "/";
    },
        onError: (error: any) => {
        alert("Ошибка входа: " + error.message);
        },
    }
    );
};

return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
    <div className=" w-sm aspect-square bg-black/30 rounded-sm p-4 ">
    <h1 className="text-xl font-bold text-center mb-4">Вход</h1>
        <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="flex flex-col gap-4"
        >
        <input
            {...form.register("email")} placeholder="Email"
            className="h-12 bg-neutral-200 border-neutral-500 rounded-md placeholder:text-white-500 px-4 text-black"
        />
        <input
            {...form.register("password")} placeholder="Password"
            className="h-12 bg-neutral-200 border-neutral-500 rounded-md placeholder:text-white-500 px-4 text-black"
        />
        <button type="submit" className="text-xl font-bold text-center">Войти</button>
        </form>
        <div className="flex flex-col items-center justify-center"> 
            <p className="mt-4 text-neutral-500">Нет аккаунта?</p>
            <a href="/auth/sign-up" className="text-white hover:underline text-center">Зарегистрироваться</a>
        </div>
    </div>
    </div>
);
}