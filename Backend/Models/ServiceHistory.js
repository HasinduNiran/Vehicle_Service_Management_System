import mongoose from "mongoose";

// Defining the service Schema

const serviceSchema = mongoose.Schema(
    {
        cusID: {
            type: String, // Changed to String type for custom format
            unique: true
        },
        Customer_Name: {
            type: String,
            required: true,
        },
        Allocated_Employee: {
            type: String,
            required: true,
        },
        Vehicle_Number: {
            type: String,
            required: true,
        },
        Service_History: {
            type: String,
            required: true,
        },


        Service_Date: {
            type: String,
            required: true,
        },
        Milage: {
            type: String,
            required: true,
        },
        Package: {
            type: String,

        }, 
        Servicename: {
            type: String,
            
        },
        Booking_Id: {
            type: String,
            required: true,
        },
        nextService: {
            type: String,
            required: true,
        }



    }


);

export const serviceHistory = mongoose.model('serviceHistory', serviceSchema);
