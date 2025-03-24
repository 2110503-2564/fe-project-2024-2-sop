import { ApiResponse } from '@/libs/interfaces';

export async function getBookings(token: string): Promise<ApiResponse> {
    const response = await fetch('http://localhost:5000/api/v1/bookings', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch bookings: ${response.status} ${response.statusText} - ${errorText}`);
    }


    return await response.json();
}
