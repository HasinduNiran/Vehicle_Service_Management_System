import mongoose from 'mongoose';

const paymentInvoiceSchema = mongoose.Schema({

    InvoiceId:{
        type:String,
        required:true
    },
    customerName:{
        type:String,
        required:true
    },
    PaymentId:{
        type:String,
        required:true
    },
    Vehicle_Number:{
        type: String,
        required: true,
    },
    Vehicle_Color: {
        type: String,
        required: true
    },
    Model: {
        type: String,
        required: true
    },
    Year: {
        type: String,
        required: true
    },
    Engine_Details: {
        type: String,
        required: true
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
    }



});