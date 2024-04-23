import mongoose from 'mongoose';

const paymentSchema = mongoose.Schema({

    PaymentId:{
        type:String,
        required:true
    },
    cusID: {
        type: [String],
        required: true
    },
    duplicatedCusID: {
        type: [String], // New field to hold duplicated cusID
        required: true
    },
    email:{
        type:String
    },
    Vehicle_Number:{
        type: String,
        required: true,
    },
    PaymentDate:{
        type:String,
        required:true
    },
    // totalAmount:{
    //     type:Number,
        
    // },
    PaymentMethod: {
        type: String,
        required:true
    }, 
    Booking_Id: {
        type: String,
        required: true,
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
        required:true
     }
    // Package:{
    //     type:String,
    //     required:true,
    // },
    // selectedServices: {
    //     type: String,
    //     required: true
    // }
    // ServiceName: {
    //     type: String,
    //     required: true,
    // }

});

export const Payment = mongoose.model('payment',paymentSchema);
