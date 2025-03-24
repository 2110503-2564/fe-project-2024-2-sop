'use client';

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useAppSelector } from '@/redux/store';
import TopMenuItem from "./TopMenuItem";

export default function TopMenu() {
    const { data: session } = useSession();
    const bookItems = useAppSelector((state) => state.bookSlice.bookItems);
    
    return (
        <div className="flex items-center justify-between bg-blue-600 text-white p-4 shadow-lg">
            {/* Left section - My Booking and Sign-In/Out */}
            <div className="flex items-center space-x-6">
                {session ? (
                    <Link href="/api/auth/signout" className="text-white hover:text-gray-300 transition-colors duration-200">
                        Sign-Out
                    </Link>
                ) : (
                    <Link href="/api/auth/signin" className="text-white hover:text-gray-300 transition-colors duration-200">
                        Sign-In
                    </Link>
                )}
                <TopMenuItem title="My Booking" href="/mybooking" count={bookItems.length} />
                
            </div>
            
            {/* Right section - Logo, Brand, and Booking */}
            <div className="flex items-center space-x-6">
                <TopMenuItem title="Booking" href="/booking" />
                <div className="flex items-center">
                    <div className="mr-2">
                        <div className="rounded-full bg-white p-0.5 shadow-md hover:bg-gray-200 transition-colors duration-200">
                            <Image src="/img/logo.png" alt="Logo" width={48} height={48} className="rounded-full" />
                        </div>
                    </div>
                    <Link href="/" className="text-2xl font-bold">
                        Venue Explorer
                    </Link>
                </div>
                
            </div>
        </div>
    );
}