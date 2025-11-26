"use client";

import { authClient } from "@/src/lib/client/auth-client"; 

export default function SignOut() {
    const doSignOut = async () => {
    try {
        await authClient.signOut();
        alert("Выход выполнен!");
        window.location.href = "/";
    } catch (error: any) {
        alert("Ошибка выхода: " + error.message);
        window.location.href = "/";
    }
};

doSignOut();

return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
    <div className=" w-sm aspect-square bg-black/30 rounded-sm p-4">
    <h1 className="text-xl font-bold text-center mb-4 text-white">Выход</h1>
        <p className="text-center text-white">Выполняется выход...</p>
    </div>
    </div>
);
}