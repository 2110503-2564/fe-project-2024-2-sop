'use client';

import { useRouter } from "next/navigation";

export default function LoginPanel() {
    const router = useRouter();

    return (
        <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-center min-h-[270px]">
            <div>
                <h2 className="text-center mb-8">กรุณา login หรือ สมัคร account</h2>
                <div className="flex justify-center space-x-4">
                    <button 
                        onClick={() => router.push("/login")}
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        Login
                    </button>
                    <button 
                        onClick={() => router.push("/register")} 
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        SignUp
                    </button>
                </div>
            </div>
        </div>
    );
}