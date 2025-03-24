'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { ApiResponse, Booking, Company, InterviewSession, User } from '@/libs/interfaces';
import { getBookings } from '@/libs/getBookings';

interface HistoryPanelProps {
    isLoggedIn?: boolean;
}

export default function HistoryPanel({ isLoggedIn }: HistoryPanelProps) {
    const { data: session, status } = useSession();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [hasBookings, setHasBookings] = useState<boolean>(false);

    const userIsLoggedIn = isLoggedIn !== undefined ? isLoggedIn : (status === 'authenticated');

    useEffect(() => {
        if (userIsLoggedIn && session?.user?.token) {
            fetchUserBookings();
        }
    }, [userIsLoggedIn, session]);

    const fetchUserBookings = async () => {
        if (!session?.user?.token) return;

        setIsLoading(true);
        setError(null);

        try {
            const data = await getBookings(session.user.token);
            
            if (data.data && data.data.length > 0) {
                setBookings(data.data);
                setHasBookings(true);
            } else {
                setHasBookings(false);
            }
        } catch (err) {
            console.error('Error fetching bookings:', err);
            const errorMessage = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดที่ไม่คาดคิด';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // ... rest of the component remains the same ...
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getCompanyName = (booking: Booking) => {
        if (typeof booking.company === 'object' && booking.company !== null) {
            return booking.company.name || 'บริษัท';
        }
        return 'บริษัท';
    };

    const getSessionTitle = (booking: Booking) => {
        if (booking.interviewsessions && booking.interviewsessions.length > 0) {
            return booking.interviewsessions[0].sessionName || 'รอบสัมภาษณ์';
        }
        if (typeof booking.interviewSession === 'object' && booking.interviewSession !== null) {
            return (booking.interviewSession as InterviewSession).sessionName || 'รอบสัมภาษณ์';
        }
        return 'รอบสัมภาษณ์';
    };

    return (
        <div className="bg-white rounded-lg shadow p-6 h-[275px] flex flex-col">
            <h2 className="font-medium mb-4 text-center sticky top-0 bg-white">ประวัติการจองของคุณ</h2>
            
            {userIsLoggedIn ? (
                <div className="flex-1 overflow-hidden flex flex-col">
                    {isLoading ? (
                        <div className="text-center py-4">
                            <p>กำลังโหลดข้อมูล...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500 py-4">
                            <p>{error}</p>
                            <button 
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                onClick={fetchUserBookings}
                            >
                                ลองใหม่
                            </button>
                        </div>
                    ) : hasBookings ? (
                        <div className="border-t pt-4 mt-4 overflow-y-auto flex-1" style={{ maxHeight: 'calc(100% - 30px)' }}>
                            <ul className="divide-y divide-gray-200">
                                {bookings.map((booking) => (
                                    <li key={booking._id} className="py-3">
                                        <div className="flex flex-col">
                                            <span className="font-medium">
                                                {getCompanyName(booking)}
                                            </span>
                                            <span className="text-sm text-gray-600">
                                                {getSessionTitle(booking)}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                วันที่จอง: {formatDate(booking.bookingDate)}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="border-t pt-4 mt-4">
                            <p className="text-center text-gray-600">ไม่มีประวัติการจอง</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="border-t pt-4 mt-4">
                    <p className="text-center mb-2">กรุณา Login ก่อนเพื่อเข้าถึง</p>
                    <p className="text-center">ประวัติของท่าน</p>
                </div>
            )}
        </div>
    );
}