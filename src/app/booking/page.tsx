"use client";

import React from "react";
import BookingList from "@/components/BookingList";
import ProfileCard from "@/components/ProfileCard";
import { useSession } from "next-auth/react";

const BookingPage: React.FC = () => {
  const { data: session } = useSession();

  // Ensure session is loaded
  if (!session) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <p>Loading session...</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <BookingList token={session.user.token} /> {/* or session.user.accessToken */}
          </div>
          <div>
            <ProfileCard user={session.user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;