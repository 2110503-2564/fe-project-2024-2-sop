"use client";

import React from "react";
import BookingList from "@/components/BookingList";
import ProfileCard from "@/components/ProfileCard";
import { useSession } from "next-auth/react";


const BookingPage: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <BookingList />
          </div>
          <div>
            <ProfileCard user={session?.user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
