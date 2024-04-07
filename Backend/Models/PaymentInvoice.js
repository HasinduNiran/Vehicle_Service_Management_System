import mongoose from 'mongoose';

const paymentInvoiceSchema = mongoose.Schema({
    InvoiceId:{
        type:String,
        required:true
    },
    customerName:{
        type:String,
        required:false
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
    Booking_Id: {
        type: String,
        required: true,
    }
});

export const PaymentInvoice = mongoose.model('paymentinvoice',paymentInvoiceSchema);
