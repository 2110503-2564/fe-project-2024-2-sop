'use client';

import { useEffect, useState } from 'react';
import { ApiResponse, Booking, Company, InterviewSession, User } from '@/libs/interfaces';
import { getBookings } from '@/libs/getBookings';
import { fetchUserProfile } from '@/libs/getUser';

interface HistoryPanelProps {
    user?: any;  // Use any to match NextAuth user type
}

interface UserProfileData {
    name: string;
    email: string;
    role: string;
    // Add other fields as needed
}

export default function HistoryPanel({ user }: HistoryPanelProps) {
    const [userData, setUserData] = useState<UserProfileData | null>(null);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [hasBookings, setHasBookings] = useState<boolean>(false);
    
    // Get token from user object (assuming NextAuth)
    const token = user?.token;
    const userIsLoggedIn = !!token;

    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                console.log('No token provided');
                setIsLoading(false);
                return;
            }

            try {
                // Fetch user profile
                const profileData = await fetchUserProfile(token);
                console.log('User Profile Data:', profileData);
                setUserData({
                    name: profileData.name,
                    email: profileData.email,
                    role: profileData.role
                });

                // Fetch bookings
                const bookingsData = await getBookings(token);
                console.log('Raw Bookings Response:', bookingsData);
                
                if (bookingsData && bookingsData.data && bookingsData.data.length > 0) {
                    console.log('Bookings Found:', bookingsData.data.length);
                    setBookings(bookingsData.data);
                    setHasBookings(true);
                } else {
                    console.log('No Bookings Found');
                    setHasBookings(false);
                    setBookings([]);
                }
            } catch (err) {
                console.error('Fetch Error:', err);
                const errorMessage = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดที่ไม่คาดคิด';
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [token]);

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
            <h2 className="font-medium mb-4 text-center sticky top-0 bg-white text-2xl">
                {userData?.role === 'admin' ? 'การจองทั้งหมด' : 'การจองของท่าน'}
            </h2>            
            
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
                                onClick={() => {
                                    setIsLoading(true);
                                    setError(null);
                                }}
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
                                                วันจอง: {formatDate(booking.bookingDate)}
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