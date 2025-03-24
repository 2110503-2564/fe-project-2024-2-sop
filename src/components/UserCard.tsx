
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import { User } from '@/libs/interfaces';

  export default function UserCard({ UserProfile }: { UserProfile: User }) {
    if (!UserProfile) {
        return <div className="text-center p-5 text-gray-600">User not found</div>;
    }

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
            
            <div className="flex justify-center">
                <img
                    src="https://lh3.googleusercontent.com/d/1QGpQrJxHVTsxNikeNaqwwBySvrVaV_yC=w500"
                    alt="User Picture"
                    className="w-32 h-32 object-cover rounded-full shadow-md"
                />
            </div>

            
            <div className="text-center mt-4">
                <h2 className="text-xl font-semibold text-gray-800">{UserProfile.name}</h2>
                <p className="text-gray-600">{UserProfile.email}</p>
                <span className="px-4 py-1 mt-2 inline-block bg-blue-100 text-blue-600 rounded-full text-sm">{UserProfile.role}</span>
            </div>
        </div>
    );
}
