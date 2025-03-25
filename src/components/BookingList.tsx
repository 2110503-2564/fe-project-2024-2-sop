"use client";
import React, { useEffect, useState } from "react";
import BookingItem from "./BookingItem";
import { getBookings } from "@/libs/getBookings";
import { deleteBooking } from "@/libs/deleteBooking";
import { Booking } from "@/libs/interfaces";

interface BookingListProps {
  token: string;
}

const BookingList: React.FC<BookingListProps> = ({ token }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchBy, setSearchBy] = useState<"company">("company"); // Only search by company

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const bookingData = await getBookings(token);
        setBookings(bookingData.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load booking data.");
        console.error(err); // Log error to console for debugging
        setLoading(false);
      }
    };

    fetchBooking();
  }, [token]);

  const handleDelete = async (id: string) => {
    try {
      await deleteBooking(token, id);
      setBookings((prev) => prev.filter((booking) => booking._id !== id));
    } catch (err) {
      alert("Failed to delete booking.");
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const searchTarget = booking.company?.name;
    return searchTarget?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (loading) {
    return <div className="p-4 text-gray-600">Loading bookings...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        {error}{" "}
        <button
          onClick={() => {
            setLoading(true);
            setError(null);
            // Retry fetching data
            fetchBooking();
          }}
          className="text-blue-500 underline"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Your Bookings</h2>

      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          className="p-2 border rounded-lg w-full"
          placeholder="Search by Company"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Display filtered bookings */}
      {filteredBookings.length === 0 ? (
        <p className="text-gray-600">No bookings found</p>
      ) : (
        filteredBookings.map((booking) => (
          <BookingItem
            key={booking._id}
            id={booking._id}
            title={booking.company?.name || "Company"}
            description={
              booking.interviewSession?.sessionName ||
              "Session Info Unavailable"
            }
            token={token}
            user={booking.user?.name || "User"}
            onDelete={() => handleDelete(booking._id)}
          />
        ))
      )}
    </div>
  );
};

export default BookingList;
