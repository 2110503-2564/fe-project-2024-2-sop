'use client';

import Navbar from "@/components/NavBar";
import LoginPanel from "@/components/LoginPanel";
import FeatureCards from "@/components/FeatureCards";
import HistoryPanel from "@/components/HistoryPanel";
import { useSession } from "next-auth/react";

export default function Home() {
    const { data: session } = useSession();

    return (
        <main className="flex flex-col items-center min-h-screen bg-gray-100">
            <Navbar />
            
            <div className="w-full max-w-6xl p-6 my-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {!session ? <LoginPanel /> : <UserInfoPanel user={session.user} />}
                    <FeatureCards />
                    <HistoryPanel isLoggedIn={!!session} />
                </div>
            </div>
        </main>
    );
}

function UserInfoPanel({ user }) {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col items-center">
                {user?.image && (
                    <div className="mb-4">
                        <img src={user.image} alt="Profile" className="rounded-full w-16 h-16" />
                    </div>
                )}
                <h2 className="text-center mb-2 font-medium">ยินดีต้อนรับ</h2>
                <p className="text-center text-gray-700">{user?.name || "User"}</p>
            </div>
        </div>
    );
}