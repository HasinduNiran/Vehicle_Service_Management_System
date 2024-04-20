import mongoose from 'mongoose';


const vehicleSchema = mongoose.Schema({
    
    
    
    Booking_Date: {
        type: Date,
        required: true
    },
    BookingLimit: {
        type: Number,
        required: true
    }
    
});


export const setLimit = mongoose.model('bookingLimits',vehicleSchema);
