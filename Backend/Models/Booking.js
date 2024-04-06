import mongoose from 'mongoose';


const vehicleSchema = mongoose.Schema({
    Booking_Date: {
        type: Date,
        required: true
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

