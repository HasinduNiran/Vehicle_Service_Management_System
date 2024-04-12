import mongoose from 'mongoose';


const vehiclSchema = mongoose.Schema({
    
    
    
    BookingLimit: {
        type: Number,
        required: true
    }
    
});


export const setLimit = mongoose.model('bookingLimits',vehiclSchema);
