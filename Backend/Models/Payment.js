import mongoose from 'mongoose';

const paymentSchema = mongoose.Schema({

    PaymentId:{
        type:String,
    
    },
    cusID: {
        type: String, // connect to the customer

        required:true

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
    email: {type:String},
     Samount:{
        type:[Number],
       
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