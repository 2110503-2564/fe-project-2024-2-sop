"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Banner() {
    const [imageIndex, setImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const { data: session, status } = useSession();
    const [userName, setUserName] = useState<string | null>(null);
    
    useEffect(() => {
        if (typeof window !== 'undefined' && session?.user?.token) {
            fetchUserProfile(session.user.token);
        }
    }, [session]);
    
    const fetchUserProfile = async (token: string) => {
        try {
            const response = await fetch("http://localhost:5000/api/v1/auth/me", {
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
        "/img/cover3.jpg"
    ];
    
    const handleBannerClick = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
        }
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
                <Image src={images[imageIndex]} alt="job fair banner" fill={true} className="object-cover w-full h-full" priority />
            </div>
            <div className="absolute bottom-4 w-full flex justify-center gap-2 z-10">
                {images.map((_, idx) => (
                    <button key={idx} className={`w-3 h-3 rounded-full ${idx === imageIndex ? "bg-white" : "bg-gray-400"}`} onClick={(e) => {e.stopPropagation(); setImageIndex(idx);}} />
                ))}
            </div>
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 text-white text-center px-5 z-5">
                <h1 className="text-4xl mb-4 font-bold text-shadow-lg">Connect with Your Future Career</h1>
                <p className="text-xl mb-2 text-shadow-md">Register Now for Our Annual Job Fair</p>
                <p className="text-lg text-shadow-md">May 10-12, 2022 </p>
            </div>
        </div>
    );
}