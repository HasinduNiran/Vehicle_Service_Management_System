import mongoose from 'mongoose';


const vehicleSchema = mongoose.Schema({
    
    Booking_Date: {
        type: Date,
        required: true
    },
    cusID: {
        type: String, // Changed to String type for custom format
        unique: true
    },
    Customer_Name: {
        type: String,
        required: true
    },
    Vehicle_Type: {
        type: String,
        required: true
    },
    Vehicle_Number: {
        type: String,
        required: true
    },
    Contact_Number: {
        type: Number,
        required: true
    },
    Email: {
        type: String,
        required: true
    }
    
})

export const createVehicle = mongoose.model('bookings',vehicleSchema);

