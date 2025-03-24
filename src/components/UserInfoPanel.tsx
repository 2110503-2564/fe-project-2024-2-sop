"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

// Define the shape of the user prop
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

interface UserInfoPanelProps {
  user: User; // Expecting a user prop of type User
}

const UserInfoPanel: React.FC<UserInfoPanelProps> = ({ user }) => {
  const [userName, setUserName] = useState<string | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.token) {
      fetchUserProfile(user.token);
    }
  }, [user]);

  const fetchUserProfile = async (token: string) => {
    setIsLoading(true);
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
        
        // Assuming the Google Drive link is stored in a field like 'profileImage' or 'avatar'
        if (data?.data?.image) {
          const driveUrl = data.data.image;
          
          // Better Google Drive URL conversion
          const directImageUrl = convertGoogleDriveUrl(driveUrl);
          setProfileImageUrl(directImageUrl);
          
          // Pre-fetch the image to check if it loads correctly
          checkImageAccess(directImageUrl);
        }
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to convert Google Drive sharing URL to direct image URL
  const convertGoogleDriveUrl = (driveUrl: string): string => {
    // First pattern: https://drive.google.com/file/d/FILE_ID/view
    if (driveUrl.includes("drive.google.com/file/d/")) {
      const fileId = driveUrl.split("/file/d/")[1].split("/")[0];
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    }
    
    // Second pattern: https://drive.google.com/open?id=FILE_ID
    if (driveUrl.includes("id=")) {
      const fileId = driveUrl.split("id=")[1].split("&")[0];
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    }
    
    // For already direct links
    return driveUrl;
  };
  
  // Check if the image is accessible
  const checkImageAccess = (url: string) => {
    const img = new Image();
    img.onload = () => {
      // Image loaded successfully
      console.log("Image loaded successfully:", url);
    };
    img.onerror = () => {
      console.error("Image failed to load:", url);
      // If thumbnail approach fails, try a different method
      if (url.includes("thumbnail")) {
        const fileId = url.includes("id=") ? url.split("id=")[1].split("&")[0] : "";
        if (fileId) {
          const alternativeUrl = `https://lh3.googleusercontent.com/d/${fileId}`;
          setProfileImageUrl(alternativeUrl);
        }
      }
    };
    img.src = url;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col items-center">
        {/* Profile image with loading state */}
        <div className="mb-4 relative w-16 h-16">
          {isLoading ? (
            <div className="animate-pulse bg-gray-200 rounded-full w-16 h-16"></div>
          ) : (
            <img 
              src={profileImageUrl || "/img/profile-placeholder.png"} 
              alt="Profile" 
              className="rounded-full w-16 h-16 object-cover"
              
            />
          )}
        </div>
        <h2 className="text-center mb-2 font-medium">ยินดีต้อนรับ</h2>
        <p className="text-center text-gray-700 mb-4">{userName || user.name}</p>
        
        {/* Edit Profile Button */}
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