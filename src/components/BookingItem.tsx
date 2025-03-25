import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Trash } from "lucide-react";
import { fetchUserProfile } from "@/libs/getUser"; 
import {User} from "@/libs/interfaces"

interface BookingItemProps {
  id: string;
  title: string;
  description: string;
  token: string;
  user: string;
  onDelete: () => void;
}

const BookingItem: React.FC<BookingItemProps> = ({ id, title, description, token, user, onDelete }) => {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const profile = await fetchUserProfile(token);
        setSession(profile);
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };
    
    getUserProfile();
  }, [token]);

  if (!session) {
    return <div>Loading...</div>; // or a suitable fallback/loading state
  }

  return (
    <div className="p-3 border rounded-lg shadow-sm mb-2 flex justify-between items-center">
      <Link href={`/booking/${id}`} className="flex-1 cursor-pointer">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-gray-600">{description}</p>
          {session.role === "admin" && <p className="text-gray-600">user: {user}</p>}
        </div>
      </Link>
      <Trash
        className="text-red-500 cursor-pointer hover:text-red-700"
        size={20}
        onClick={(e) => {
          e.stopPropagation(); // Prevents navigation when deleting
          onDelete();
        }}
      />
    </div>
  );
};

export default BookingItem;
