'use client'
import React, { useState, useEffect } from "react";
import { fetchUserProfile } from "@/libs/getUser";
import { getAlternativeImageUrl } from "@/libs/googleDrive";
import Link from "next/link";


interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
  tel?: string;
}

const ProfileCard: React.FC<{ user?: User | null }> = ({ user }) => {
  const [profile, setProfile] = useState<{ 
    name: string; 
    email: string; 
    imageUrl: string;
    tel?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState("/img/profile-placeholder.png");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      
      try {
        if (!user || !user.token) {
          throw new Error("Please sign in to view profile");
        }
        
        const userData = await fetchUserProfile(user.token);
        
        if (!userData) {
          throw new Error("Profile data not found");
        }

        setProfile(userData);
        
        if (userData.imageUrl) {
          const img = new Image();
          img.onerror = () => {
            setProfileImageUrl(
              getAlternativeImageUrl(userData.imageUrl) || 
              "/img/profile-placeholder.png"
            );
          };
          img.onload = () => setProfileImageUrl(userData.imageUrl);
          img.src = userData.imageUrl;
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user?.token]);

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-48">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 h-16 w-16"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 rounded-lg border border-red-100 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 max-w-md w-full">
      <div className="flex items-start gap-6">
        <div className="relative">
          <img
            src={profileImageUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-1 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800">
            {profile?.name || "User"}
          </h3>
          <p className="text-gray-600 mt-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            {profile?.email || "No email provided"}
          </p>
          
          {profile?.tel && (
            <p className="text-gray-600 mt-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              {profile.tel}
            </p>
          )}
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex space-x-3">
            <Link href="/profile">

              <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100 transition">
                Edit Profile
              </button>
    
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;