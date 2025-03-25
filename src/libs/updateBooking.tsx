import Company from '@/app/company/page';
import { ApiResponse,input } from '@/libs/interfaces';

export async function updateBooking(token: string,bid:string , date:string): Promise<ApiResponse> {

    const response = await fetch(`http://localhost:5000/api/v1/bookings/${bid}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            bookingDate:date,
        }),
    });

    return await response.json();
}