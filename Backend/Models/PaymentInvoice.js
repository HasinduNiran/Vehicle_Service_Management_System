import mongoose from 'mongoose';

const paymentInvoiceSchema = mongoose.Schema({
    InvoiceId:{
        type:String,
        required:true
    },
    customerName:{type:String}
    , // Removed 'required: true' since it's optional
     cusID: {
        type: [String],
        
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
    Package: {type:String}
    , // Removed 'required: true' since it's optional
     selectedServices: {
        type: [String],
       
    },
    Pamount: {type:Number}
    ,totalAmount: {type:Number},
     Samount:{
        type:[Number],
       
     },
    Booking_Id: {
        type: String,
        required: true,
    }
});

export const PaymentInvoice = mongoose.model('paymentinvoice',paymentInvoiceSchema);
