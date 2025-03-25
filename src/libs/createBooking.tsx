import Company from '@/app/company/page';
import { ApiResponse,input } from '@/libs/interfaces';

export async function createBooking(token: string, all:input): Promise<ApiResponse> {
    console.log(all);

    const response = await fetch('http://localhost:5000/api/v1/bookings', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            interviewSession:all.interviewSession,
            company:all.company,
            user:"",
            bookingDate:all.bookingDate,
        }),
    });

    return await response.json();
}