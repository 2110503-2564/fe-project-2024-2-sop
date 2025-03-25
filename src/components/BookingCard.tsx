import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getBooking } from "@/libs/getBooking";
import { deleteBooking } from "@/libs/deleteBooking";
import { updateBooking } from "@/libs/updateBooking";  // Import the new function
import { Booking } from "@/libs/interfaces";

export default function BookingCard({ token, data }: { token: string; data: string }) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const bookingData = await getBooking(token, data);
        setBooking(bookingData.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load booking data.");
        setLoading(false);
      }
    };

    fetchBooking();
  }, [token, data]);

  const handleDelete = async (id: string) => {
    try {
      await deleteBooking(token, id);
      window.location.href = "/booking"; // Redirect after deletion
    } catch (err) {
      alert("Failed to delete booking.");
    }
  };

  const handleSave = async () => {
    if (!selectedDate || !booking) {
      setMessage("Please select a date before saving.");
      return;
    }

    try {
      const response = await updateBooking(token, booking._id, selectedDate);
      if (response.success) {
        setMessage("Booking date updated successfully.");
        setBooking({ ...booking, bookingDate: selectedDate });
      } else {
        setMessage("Failed to update booking date." + response.message);
      }
    } catch (err) {
      setMessage("An error occurred while updating the booking date." + err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-1/2 mx-auto border border-gray-300 rounded-lg p-5 relative h-[500px]">
      {/* Header text */}
      <div className="text-xl font-bold mb-5">Booking Information</div>

      {/* Interview Session at the top (bigger text) */}
      {booking && typeof booking.interviewSession === "object" && (
        <div className="text-2xl font-bold text-blue-600 mb-5">
          {booking.interviewSession.sessionName}
        </div>
      )}

      {/* Booking details */}
      {booking && (
        <div className="mb-5">
          <div className="text-lg font-semibold">
            <strong>Booking Date:</strong> {formatDate(booking.bookingDate)}
          </div>
          <div>
            <strong>User Name:</strong>   {booking.user && typeof booking.user === "object" ? booking.user.data.name : "N/A"}

          </div>
          <div>
            <strong>User Tel:</strong> {booking.user && typeof booking.user === "object" ? booking.user.data.tel : "N/A"}
          </div>
          <div>
            <strong>Company Name:</strong> {booking.company && typeof booking.company === "object" ? booking.company.name : "N/A"}
          </div>
          <div>
            <strong>Company Address:</strong> {booking.company && typeof booking.company === "object" ? booking.company.address : "N/A"}
          </div>
          <div>
            <strong>Company Tel:</strong> {booking.company && typeof booking.company === "object" ? booking.company.tel : "N/A"}
          </div>
          <div>
            <strong>Company Website:</strong>{" "}
            {booking.company && typeof booking.company === "object" && booking.company.website ? (
              <a
                href={booking.company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {booking.company.website}
              </a>
            ) : (
              "N/A"
            )}
            {/* Display start and end date below the select dropdown */}
            {booking?.interviewSession && typeof booking.interviewSession === "object" && (
              <div className="mt-5">
                <div>
                  <strong>Start Date:</strong> {booking.interviewSession.startDate ? formatDate(booking.interviewSession.startDate) : "N/A"}
                </div>
                <div>
                  <strong>End Date:</strong> {booking.interviewSession.endDate ? formatDate(booking.interviewSession.endDate) : "N/A"}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Date selection dropdown now positioned lower */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-1/2">
        <label htmlFor="date" className="font-semibold">Select a Date:</label>
        <select
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full p-2 mt-1 border border-gray-300 rounded-md"
        >
          <option value="">Select a date</option>
          <option value="2022-05-10">May 10, 2022</option>
          <option value="2022-05-11">May 11, 2022</option>
          <option value="2022-05-12">May 12, 2022</option>
          <option value="2022-05-13">May 13, 2022</option>
        </select>
      </div>

      {/* Message display */}
      {message && <div className="text-center text-green-500 mt-2">{message}</div>}

      {/* Action buttons */}
      <div className="absolute bottom-5 left-5">
        <Link href="/booking">
          <button className="px-4 py-2 bg-gray-500 text-white rounded-md">Back</button>
        </Link>
      </div>

      <div className="absolute bottom-5 right-5 flex gap-3">
        <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded-md">
          Save
        </button>
        {booking && (
          <button
            onClick={() => handleDelete(booking._id)}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
