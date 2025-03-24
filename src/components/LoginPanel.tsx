'use client';

import { signIn } from "next-auth/react";

export default function LoginPanel() {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-center mb-4">กรุณา login หรือ register account</h2>
            <div className="flex justify-center space-x-4 mt-4">
                <button 
                    onClick={() => signIn()}
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    Login
                </button>
                <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors">
                    SignUp
                </button>
            </div>
        </div>
    );
}