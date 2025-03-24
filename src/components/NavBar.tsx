'use client';

import Image from "next/image";
import Link from "next/link";
import { useSession ,signOut} from "next-auth/react";
import { useAppSelector } from '@/redux/store';

export default function Navbar() {
    const { data: session } = useSession();
    const handleSignOut = () => {
        signOut({
            callbackUrl: '/', // Redirect to the home page after sign out
        });
    };
    return (
        <nav className="w-full bg-white p-4 shadow-sm">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <h1 className="text-xl font-bold text-gray-600">SOP</h1>
                </div>
                <div className="flex space-x-6">
                    <Link href="/" className="text-gray-600 hover:text-gray-800">Home</Link>
                    <Link href="/company" className="text-gray-600 hover:text-gray-800">Company</Link>
                    <Link href="/interviewsessions" className="text-gray-600 hover:text-gray-800">InterviewSessions</Link>
                    <Link href="/booking" className="text-gray-600 hover:text-gray-800">Booking</Link>
                    <Link href="/profile" className="text-gray-600 hover:text-gray-800">Profile</Link>
                    {session ? (
                       <button 
                            onClick={handleSignOut} // Use button to trigger sign out
                            className="text-gray-600 hover:text-gray-800">
                            Logout
                        </button>
                    ) : (
                        <Link href="/login" className="text-gray-600 hover:text-gray-800">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}