// pages/api/bookings/user/[userId].js
import dbConnect from '../../../../utils/dbConnect';
import Booking from '../../../../models/Booking';

export default async function handler(req, res) {
    const { userId } = req.query;
    
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
    
    try {
        await dbConnect();
        
        // Find all bookings for this user and populate the related data
        const bookings = await Booking.find({ user: userId })
            .populate('company', 'name') // Adjust fields as needed
            .populate('interviewSession', 'title startTime endTime') // Adjust fields as needed
            .sort({ bookingDate: -1 }); // Most recent first
            
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}