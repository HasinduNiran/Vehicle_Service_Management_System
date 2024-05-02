import mongoose from 'mongoose';


const vehicleSchema = mongoose.Schema({
    
    Booking_Date: {
        type: Date,
        required: true
    },
   
    Booking_Limit: {
        type: Number,
        required: true
    }
});

export const addLimit = mongoose.model('bookinglimits',vehicleSchema);