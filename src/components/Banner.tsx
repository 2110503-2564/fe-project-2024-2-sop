"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Banner() {
    const router = useRouter();
    const [imageIndex, setImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const { data: session, status } = useSession();
    const [userName, setUserName] = useState<string | null>(null);
    
    useEffect(() => {
        // Skip API call during tests or when there's no session
        if (typeof window !== 'undefined' && session?.user?.token) {
            fetchUserProfile(session.user.token);
        }
    }, [session]);
    
    const fetchUserProfile = async (token: string) => {
        try {
            const response = await fetch("https://a08-venue-explorer-backend.vercel.app/api/v1/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data?.data?.name) {
                    setUserName(data.data.name);
                }
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };
    
    const images = [
        "/img/cover.jpg",
        "/img/cover2.jpg",
        "/img/cover3.jpg",
        "/img/cover4.jpg"
    ];
    
    const handleBannerClick = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
        }
    };
    
    const handleSelectVenue = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        router.push("/venue");
    };
    
    useEffect(() => {
        if (isTransitioning) {
            const timer = setTimeout(() => {
                setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
                setIsTransitioning(false);
            }, 420);
            return () => clearTimeout(timer);
        }
    }, [isTransitioning, images.length]);
    
    return (
        <div className="relative w-full h-[400px] cursor-pointer overflow-hidden" onClick={handleBannerClick}>
            <div className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${isTransitioning ? "-translate-x-full" : "translate-x-0"}`}>
                <Image src={images[imageIndex]} alt="cover" fill={true} className="object-cover w-full h-full" priority />
            </div>
            <div className="absolute bottom-4 w-full flex justify-center gap-2 z-10">
                {images.map((_, idx) => (
                    <button key={idx} className={`w-3 h-3 rounded-full ${idx === imageIndex ? "bg-white" : "bg-gray-400"}`} onClick={(e) => {e.stopPropagation(); setImageIndex(idx);}} />
                ))}
            </div>
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 text-white text-center px-5 z-5">
                <h1 className="text-4xl mb-4 font-bold text-shadow-lg">where every event finds its venue</h1>
                <p className="text-lg text-shadow-md">let's go and booking!</p>
            </div>
            
            {status === "authenticated" && (
                <div className="absolute top-4 right-6 bg-black bg-opacity-50 py-2 px-4 rounded text-white font-medium z-20">
                    Welcome, {userName || session?.user?.name || 'User'}
                </div>
            )}
            
            <button className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-lg transition-colors duration-300 z-20" onClick={handleSelectVenue}>
                Select Venue
            </button>
        </div>
    );
}