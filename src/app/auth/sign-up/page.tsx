"use client";

import { authClient } from "@/src/lib/client/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z, { email } from "zod/v4";    

export default function SignUp() {

const formSchema = z.object({
    email: z.email("Invalid email"),
    name: z.string().min(2, "Name must be at least 2 characters long"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {} as z.infer<typeof formSchema>,
});

const onFormSubmit = async (data: z.infer<typeof formSchema>) => {
    await authClient.signUp.email({
    email: data.email,
    password: data.password,
    name: data.name,
    });
};

return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
    <div className=" w-sm aspect-square bg-black/30 rounded-sm p-4">
    <h1 className="text-xl font-bold text-center mb-4">Регистрация</h1>
        <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="flex flex-col gap-4"
        >
        <input
            {...form.register("name")} placeholder="Name"
            className="h-12 bg-neutral-200 border-neutral-500 rounded-md placeholder:text-zinc-500 px-4 text-black"
        />
        <input
            {...form.register("email")} placeholder="Email"
            className="h-12 bg-neutral-200 border-neutral-500 rounded-md placeholder:text-zinc-500 px-4 text-black"
        />
        <input
            {...form.register("password")} placeholder="Password"
            className="h-12 bg-neutral-200 border-neutral-500 rounded-md placeholder:text-zinc-500 px-4 text-black"
        />
        <button type="submit" className="text-xl font-bold text-center">Зарегистрироваться</button>
        </form>
    </div>
    </div>
);
}