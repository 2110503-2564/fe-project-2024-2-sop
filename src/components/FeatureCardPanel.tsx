// page.tsx (or your main page component)
'use client'; // Mark as client component since we're using useRouter

import { useRouter } from 'next/navigation';
import FeatureCard from './FeatureCard';

export default function FeatureCardsPanel() {
    const router = useRouter();

    return (
        
        <div className="flex flex-col space-y-4">
            
            <FeatureCard 
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                } 
                text="ค้นหาบริษัท"
                onClick={() => router.push('/company')}
            />
            
            <FeatureCard 
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                } 
                text="ค้นหาตำแหน่งสัมภาษณ์"
                onClick={() => router.push('/interviewsessions')}
            />
        </div>
    );
}