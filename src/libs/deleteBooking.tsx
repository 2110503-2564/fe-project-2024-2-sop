import Company from '@/app/company/page';
import { ApiResponse,input } from '@/libs/interfaces';

export async function deleteBooking(token: string, id:string): Promise<ApiResponse> {

    const response = await fetch(`https://sop-job-fair-backend.vercel.app/api/v1/bookings/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    return await response.json();
}