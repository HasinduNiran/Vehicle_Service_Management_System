import mongoose from "mongoose";

//fields of the collection
const customerSchema = mongoose.Schema(
    {
        firstName:{
            type: String,
            required:true
        },
        lastName:{
            type: String,
            required:true
        },
        NIC:{
            type: String,
            required:true 
        },
        phone:{
            type: String,
            required:true 
        },
        
        email:{
            type: String,
            required:true 
        },
       
        Username:{
            type: String,
            required:true 
        },
        password:{
            type: String,
            required:true 
        },
        

    },
    {
        timestamps:true,
    },

);

export const Customer = mongoose.model('Customer',customerSchema);
