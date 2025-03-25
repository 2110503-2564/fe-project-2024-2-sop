'use client'
import BookingCard from "@/components/BookingCard";
import { useSession } from "next-auth/react";

export default function BookingPage({ params }: { params: { bid: string } }) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>Loading session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-start justify-center pt-20">
      <BookingCard token={session.user.token} data={params.bid} />
    </div>
  );
}
