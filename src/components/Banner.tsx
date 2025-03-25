"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Banner() {
    const [imageIndex, setImageIndex] = useState(0);
    const [nextImageIndex, setNextImageIndex] = useState(1);
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
    
    // Preload all images to prevent blinking
    useEffect(() => {
        images.forEach(src => {
            // Use the global window.Image constructor instead
            const imgElement = new window.Image();
            imgElement.src = src;
        });
    }, []);
    
    const handleBannerClick = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setNextImageIndex((imageIndex + 1) % images.length);
        }
    };
    
    useEffect(() => {
        if (isTransitioning) {
            const timer = setTimeout(() => {
                setImageIndex(nextImageIndex);
                setIsTransitioning(false);
            }, 500); 
            return () => clearTimeout(timer);
        }
    }, [isTransitioning, nextImageIndex]);
    
    const handleDotClick = (idx: number) => {
        if (idx !== imageIndex && !isTransitioning) {
            setIsTransitioning(true);
            setNextImageIndex(idx);
        }
    };
    
    return (
        <div className="relative w-full h-[400px] cursor-pointer overflow-hidden" onClick={handleBannerClick}>
            {/* Always keep both images rendered, but control visibility with opacity */}
            <div 
                className="absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out"
                style={{ opacity: isTransitioning ? 0 : 1 }}
            >
                <Image 
                    src={images[imageIndex]} 
                    alt="job fair banner" 
                    fill={true} 
                    className="object-cover w-full h-full" 
                    priority 
                    sizes="100vw"
                />
            </div>
            
            <div 
                className="absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out"
                style={{ opacity: isTransitioning ? 1 : 0 }}
            >
                <Image 
                    src={images[nextImageIndex]} 
                    alt="job fair banner" 
                    fill={true} 
                    className="object-cover w-full h-full" 
                    priority 
                    sizes="100vw"
                />
            </div>
            
            <div className="absolute bottom-4 w-full flex justify-center gap-2 z-10">
                {images.map((_, idx) => (
                    <button 
                        key={idx} 
                        className={`w-3 h-3 rounded-full ${idx === imageIndex ? "bg-white" : "bg-gray-400"}`} 
                        onClick={(e) => {
                            e.stopPropagation(); 
                            handleDotClick(idx);
                        }} 
                    />
                ))}
            </div>
            
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white text-center px-5 z-5">
                <h1 className="text-4xl mb-4 font-bold text-shadow-lg">Connect with Your Future Career</h1>
                <p className="text-xl mb-2 text-shadow-md">Register Now for Our Annual Job Fair</p>
                <p className="text-lg text-shadow-md">May 10-13, 2022 </p>
            </div>
        </div>
    );
}