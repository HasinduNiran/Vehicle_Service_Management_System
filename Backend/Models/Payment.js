import mongoose from 'mongoose';

const paymentSchema = mongoose.Schema({

    empname: {
        type: String,
        required: true,
    },
    PaymentId:{
        type:String,
        required:true
    },
    cusID: {
        type: String, // connect to the customer
        unique: true
    },
    Vehicle_Number:{
        type: String,
        required: true,
    },
    PaymentDate:{
        type:String,
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    },
    PaymentMethod: {
        type: String,
        required:true
    }, 
    Booking_Id: {
        type: String,
        required: true,
    }

});

export const Payment = mongoose.model('payment',paymentSchema);