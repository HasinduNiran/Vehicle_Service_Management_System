import mongoose from "mongoose";

const customerSchema = mongoose.Schema(
    {
        cusID: {
            type: String, // Changed to String type for custom format
            unique: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        NIC: {
            type: String,
            required: true 
        },
        phone: {
            type: String,
            required: true 
        },
        email: {
            type: String,
            required: true 
        },
        username: {
            type: String,
            required: true 
        },
        password: {
            type: String,
            required: true 
        }
    },
    {
        timestamps: true,
    }
);

// Define a separate counter schema to keep track of the cusID
const counterSchema = mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 1 }
});

// Create a model for the counter
const Counter = mongoose.model('Counter', counterSchema);

// Add pre-save middleware for auto-generating cusID
customerSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {
            const doc = await Counter.findOneAndUpdate({ _id: 'customerId' }, { $inc: { seq: 1 } }, { new: true, upsert: true });
            this.cusID = 'CUS' + doc.seq;
        }
        next();
    } catch (error) {
        next(error);
    }
});

export const Customer = mongoose.model('Customer', customerSchema);
