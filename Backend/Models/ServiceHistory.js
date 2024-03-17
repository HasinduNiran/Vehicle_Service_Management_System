import mongoose from "mongoose";

// Defining the service Schema

const serviceSchema = mongoose.Schema(
    {
        Customer_Name: {
            type: String,
            required: true,
        },
        Allocated_Employee: {
            type: String,
            required: true,
        },
        Vehicle_Number:{
            type: String,
            required: true,
        },
        Service_History:{
            type: String,
            required: true,
        },
        Service_Date:{
            type: String,
            required: true,
        },


        
    }


);

export const serviceHistory = mongoose.model('serviceHistory',serviceSchema);
