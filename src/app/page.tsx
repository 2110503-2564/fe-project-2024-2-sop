'use client';

import LoginPanel from "@/components/LoginPanel";
import FeatureCards from "@/components/FeatureCardPanel";
import HistoryPanel from "@/components/HistoryPanel";
import { useSession } from "next-auth/react";
import Banner from "@/components/Banner";
import UserInfoPanel from "@/components/UserInfoPanel";  // Import the new UserInfoPanel

export default function Home() {
    const { data: session } = useSession();

    return (
        <main className="flex flex-col items-center min-h-screen bg-gray-100">
            <Banner />
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
