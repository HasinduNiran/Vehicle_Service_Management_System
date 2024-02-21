import mongoose from 'mongoose';

const paymentSchema = mongoose.Schema({

    PaymentId:{
        type:String,
        required:true
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

export const Payment = mongoose.model('payment',paymentSchema);