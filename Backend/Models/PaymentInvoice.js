import mongoose from 'mongoose';

const paymentInvoiceSchema = mongoose.Schema({
    
    customerName:{type:String}
    , // Removed 'required: true' since it's optional
     cusID: {
        type: [String],
        
    },
    email:{
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
       
    },
    Model: {
        type: String,
        
    },
    Year: {
        type: String,
        
    },
    Engine_Details: {
        type: String,
        
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
