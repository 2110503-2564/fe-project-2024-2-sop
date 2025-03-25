import { ApiResponse } from './interfaces';

export async function getBookings(token: string): Promise<ApiResponse> {
    const response = await fetch('https://sop-job-fair-backend.vercel.app/api/v1/bookings', {
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

    const data = await response.json();
    console.log("Fetched Booking Data:", JSON.stringify(data, null, 2)); // Inspect data structure
    return data;
}
