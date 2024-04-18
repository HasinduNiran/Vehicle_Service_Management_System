import mongoose from 'mongoose';


const vehicleSchema = mongoose.Schema({
    
    
    
    BookingLimit: {
        type: Number,
        required: true
    }
    
});


export const setLimit = mongoose.model('bookingLimits',vehicleSchema);
