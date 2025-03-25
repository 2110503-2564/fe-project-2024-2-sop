import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import Link from "next/link";
import { SessionItem, SessionResponse } from "@/libs/interfaces.js";

export default function SessionCard({ sessionItem, popOpen, setAll }: { sessionItem: SessionItem, popOpen: (sessionItem: SessionItem) => void, setAll: React.Dispatch<React.SetStateAction<SessionItem | null>> }) {
    const handleBookClick = () => {
        popOpen(sessionItem); // Pass the session data to the parent
    };

    return (
        <div className="relative bg-white rounded-lg shadow-md p-4 border border-gray-200 w-3/5 mx-auto">
            <div className="absolute top-0 right-0 p-2">
                <button
                    onClick={handleBookClick}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                    Book
                </button>
            </div>
            <div className="space-y-3">
                <div className='flex flex-start '>
                    <h3 className="font-semibold text-lg text-gray-800">{sessionItem.sessionName}</h3>
                </div>
                <div className='flex flex-start'>
                    <p className="text-gray-600">{sessionItem.jobPosition}</p>
                </div>
                <div className='flex flex-start'>
                    <p className="text-gray-600">{sessionItem.companiess.name}</p>
                </div>
                <div className='flex flex-start'>
                    <p className="text-gray-600">{sessionItem.jobDescription}</p>
                </div>
            </div>
            <div className="absolute bottom-0 right-0 p-4">
                <div className='flex ml-auto'>
                    <p className='text-gray-600 text-sm'>Tel: {sessionItem.companiess.tel}</p>
                </div>
                <div className='flex ml-auto'>
                    <p className='text-gray-600 text-sm'>Website: {sessionItem.companiess.website}</p>
                </div>
                <div className='flex ml-auto'>
                    <p className='text-gray-600 text-sm'>Email: {sessionItem.companiess.email}</p>
                </div>
            </div>
        </div>
    );
}
