import mongoose from 'mongoose';

const paymentSchema = mongoose.Schema({
    PaymentId: {
        type: String,
        unique: true
    },
    cusID: {
        type: String,
        required: true
    },
    Vehicle_Number: {
        type: String,
        required: true
    },
    PaymentDate: {
        type: String,
        required: true
    },
    PaymentMethod: {
        type: String,
        required: true
    },
    Booking_Id: {
        type: String,
        required: true
    },
    Package: String, // Removed 'required: true' since it's optional
    selectedServices: [String],
    Pamount: Number,
    totalAmount: Number,
    email: String,
    Samount: [Number]
});

const counterSchema = mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 1 }
});

const Counter = mongoose.model('Counter', counterSchema);

paymentSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {
            const doc = await Counter.findOneAndUpdate({ _id: 'PaymentID' }, { $inc: { seq: 1 } }, { new: true, upsert: true });
            this.PaymentId = 'PID' + doc.seq;
        }
        next();
    } catch (error) {
        next(error);
    }
});

export const Payment = mongoose.model('Payment', paymentSchema);
