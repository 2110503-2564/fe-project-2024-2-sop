import React from "react";
import BookingItem from "./BookingItem";

const BookingList: React.FC = () => {
  const bookings = [
    { id: 1, title: "Booking 1", description: "Details about booking 1" },
    { id: 2, title: "Booking 2", description: "Details about booking 2" },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Your Booking</h2>
      {bookings.map((booking) => (
        <BookingItem key={booking.id} {...booking} />
      ))}
    </div>
  );
};

export default BookingList;
