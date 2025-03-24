import React from "react";

interface BookingItemProps {
  title: string;
  description: string;
}

const BookingItem: React.FC<BookingItemProps> = ({ title, description }) => {
  return (
    <div className="p-3 border rounded-lg shadow-sm mb-2">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default BookingItem;
