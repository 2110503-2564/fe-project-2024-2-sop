'use client'
import React, { useState, useEffect } from 'react';
import UserCard from '@/components/UserCard';
import { User } from '@/libs/interfaces';
import { useSession } from "next-auth/react";
import getUserProfile from "@/libs/getUserProfile";
import { LinearProgress } from "@mui/material";

export default function ProfilePage() {
    const { data: session } = useSession();
    const [userProfile, setUserProfile] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleUpdateUser = async (updatedData: { name?: string; email?: string; tel?: string }) => {
        try {
          if (!session?.user?.token) {
            throw new Error('Unauthorized');
          }
      
          const response = await fetch(`http://localhost:5000/api/v1/auth/updatedetails`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session.user.token}`,
            },
            body: JSON.stringify(updatedData),
          });
      
          const textResponse = await response.text();
          
          try {
            const jsonData = JSON.parse(textResponse);
            if (!response.ok) throw new Error(jsonData.message || 'Update failed');
            setUserProfile(prev => prev ? { ...prev, data: { ...prev.data, ...jsonData.data } } : null);
          } catch (jsonError) {
            // Handle HTML error responses
            if (response.headers.get('content-type')?.includes('text/html')) {
              const errorMatch = textResponse.match(/<pre>(.*?)<br>/s);
              const errorMessage = errorMatch ? errorMatch[1] : 'Unknown error occurred';
              throw new Error(errorMessage);
            }
            throw new Error(`Request failed: ${response.status} ${response.statusText}`);
          }
        } catch (error) {
          console.error('Update error:', error);
          throw error;
        }
      };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                if (!session?.user?.token) {
                    setIsLoading(false);
                    setError('Unauthorized');
                    return;
                }

                setIsLoading(true);
                const profile = await getUserProfile(session.user.token);
                setUserProfile(profile);
                setError(null);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setError('Failed to load user profile');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserProfile();
    }, [session?.user?.token]);

    if (!session?.user?.token) {
        return <div className="container mx-auto p-4 max-w-md">Unauthorized</div>;
    }

    if (isLoading) {
        return (
            <div className="container mx-auto p-4 max-w-md">
                <p>Loading...</p>
                <LinearProgress />
            </div>
        );
    }

    if (error) {
        return <div className="container mx-auto p-4 max-w-md">Error: {error}</div>;
    }

    if (!userProfile) {
        return <div className="container mx-auto p-4 max-w-md">No user data found</div>;
    }

    return (
        <div className="container mx-auto p-4 max-w-md">
            <UserCard 
                UserProfile={userProfile} 
                onUpdateUser={handleUpdateUser} 
            />
        </div>
    );
}