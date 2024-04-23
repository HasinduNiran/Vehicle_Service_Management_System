import mongoose from "mongoose";

const customerSchema = mongoose.Schema(
    {
        cusID: {
            type: String, // Changed to String type for custom format
           
        },
        image: { type: String,
           
    
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        NIC: {
            type: String,
            required: true 
        },
        phone: {
            type: String,
            required: true 
        },
        email: {
            type: String,
            required: true 
        },
       
        password: {
            type: String,
            required: true 
        }
         
    },
    {
        timestamps: true,
    }
);

 

export const Customer = mongoose.model('Customer', customerSchema);
