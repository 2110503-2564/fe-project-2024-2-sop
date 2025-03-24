"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchUserProfile } from "@/libs/getUser";
import { getAlternativeImageUrl } from "@/libs/googleDrive";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

interface UserInfoPanelProps {
  user: User;
}

const UserInfoPanel: React.FC<UserInfoPanelProps> = ({ user }) => {
  const [userName, setUserName] = useState(user.name);
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.token) {
        setIsLoading(false);
        return;
      }

      try {
        const profile = await fetchUserProfile(user.token);
        setUserName(profile.name);
        
        if (profile.imageUrl) {
          const img = new Image();
          img.onerror = () => {
            const alternativeUrl = getAlternativeImageUrl(profile.imageUrl);
            setProfileImageUrl(alternativeUrl || "/img/profile-placeholder.png");
          };
          img.onload = () => setProfileImageUrl(profile.imageUrl);
          img.src = profile.imageUrl;
        } else {
          setProfileImageUrl("/img/profile-placeholder.png");
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        setProfileImageUrl("/img/profile-placeholder.png");
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [user.token]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col items-center">
        <div className="mb-4 relative w-16 h-16">
          {isLoading ? (
            <div className="animate-pulse bg-gray-200 rounded-full w-16 h-16"></div>
          ) : (
            <img 
              src={profileImageUrl} 
              alt="Profile" 
              className="rounded-full w-16 h-16 object-cover"
            />
          )}
        </div>
        <h2 className="text-center mb-2 font-medium">ยินดีต้อนรับ</h2>
        <p className="text-center text-gray-700 mb-4">{userName}</p>
        
        <Link href="/profile">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200">
            Edit Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserInfoPanel;
