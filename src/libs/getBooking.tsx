// src/libs/getBooking.ts
import { ApiResponsesolo } from './interfaces';

export async function getBooking(token: string, bid: string): Promise<ApiResponsesolo> {
  const response = await fetch(`http://localhost:5000/api/v1/bookings/${bid}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch booking');
  }

  return await response.json();
}
