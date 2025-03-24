'use client';

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const { data: session } = useSession();
    const router = useRouter();

    const handleSignOut = () => {
        signOut({ callbackUrl: '/' });
    };

    const handleProtectedRoute = (e, path) => {
        if (!session) {
            e.preventDefault();
            alert("You must log in first to access this page.");
        } else {
            router.push(path);
        }
    };

    return (
        <nav className="w-full bg-[#1e1e1e] border-b border-[#252526]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                            <span className="text-3xl font-bold text-[#007acc] tracking-tighter">
                                SOP<span className="text-[#3e3e42]">.</span>
                            </span>
                        </div>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link 
                            href="/" 
                            className="text-[#d4d4d4] hover:text-[#007acc] transition-colors duration-200 font-medium"
                        >
                            Home
                        </Link>
                        <Link 
                            href="/company" 
                            className="text-[#d4d4d4] hover:text-[#007acc] transition-colors duration-200 font-medium"
                        >
                            Company
                        </Link>
                        <Link 
                            href="/interviewsessions" 
                            className="text-[#d4d4d4] hover:text-[#007acc] transition-colors duration-200 font-medium"
                        >
                            Sessions
                        </Link>
                        <Link 
                            href="/booking" 
                            onClick={(e) => handleProtectedRoute(e, "/booking")}
                            className="text-[#d4d4d4] hover:text-[#007acc] transition-colors duration-200 font-medium"
                        >
                            Booking
                        </Link>
                        <Link 
                            href="/profile" 
                            onClick={(e) => handleProtectedRoute(e, "/profile")}
                            className="text-[#d4d4d4] hover:text-[#007acc] transition-colors duration-200 font-medium"
                        >
                            Profile
                        </Link>
                        
                        {/* Auth Section */}
                        {session ? (
                            <button
                                onClick={handleSignOut}
                                className="ml-4 px-4 py-2 bg-[#007acc] hover:bg-[#006caf] text-white rounded-md transition-all duration-200 font-medium shadow-lg hover:shadow-[#007acc]/30"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link 
                                href="/login" 
                                className="ml-4 px-4 py-2 bg-[#007acc] hover:bg-[#006caf] text-white rounded-md transition-all duration-200 font-medium shadow-lg hover:shadow-[#007acc]/30"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
