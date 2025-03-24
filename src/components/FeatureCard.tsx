// FeatureCard.tsx
import React from 'react';

interface FeatureCardProps {
    icon: React.ReactNode;
    text: string;
    onClick?: () => void;
}

export default function FeatureCard({ icon, text, onClick }: FeatureCardProps) {
    return (
        <div 
            className="bg-white rounded-lg shadow p-6 flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow"
            onClick={onClick}
            role="button"
            tabIndex={0}
        >
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                {icon}
            </div>
            <p className="text-center">{text}</p>
        </div>
    );
}