"use client";

import React, { useEffect, useState } from "react";
import BookingItem from "./BookingItem";
import { getBookings } from "@/libs/getBookings";
import { Booking } from "@/libs/interfaces";

interface BookingListProps {
  token: string;
}

const BookingList: React.FC<BookingListProps> = ({ token }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookings(token);
        // Directly use the response as it contains the bookings array
        setBookings(response.data ?? []); 
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchBookings();
    }
  }, [token]);

  if (loading) {
    return <div className="p-4 text-gray-600">Loading bookings...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Your Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-gray-600">No bookings found</p>
      ) : (
        bookings.map((booking) => (
          <BookingItem
            key={booking._id}
            title={booking.company?.name || "Company"}
            description={booking.interviewSession?.sessionName || "Interview Session"}
          />
        ))
      )}
    </div>
  );
};

export default BookingList;