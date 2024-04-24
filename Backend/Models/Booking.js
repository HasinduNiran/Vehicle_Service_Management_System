import mongoose from 'mongoose';


const vehicleSchema = mongoose.Schema({
    
    Booking_Date: {
        type: Date,
        required: true
    },
    Booking_Id: {
        type: String,
        unique: true
    },
    cusID: {
        type: String,
    
    },
    Customer_Name: {
        type: String,
        required: true
    },
    Vehicle_Type: {
        type: String,
        required: true
    },
    Vehicle_Number: {
        type: String,
        required: true
    },
    Contact_Number: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    selectedPackage: {
        type: String,
        
    },
    selectedServices: {
        type: [String],
        
    }
});

const counterSchema = mongoose.Schema({
    _id: { type: String, required: true},
    seq: { type: Number, default: 1 }
});

const Counterr = mongoose.model('Counterr', counterSchema);

vehicleSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {
            const doc = await Counterr.findOneAndUpdate({ _id: 'bookingID' }, { $inc: { seq: 1 } }, { new: true, upsert: true });
            this.Booking_Id = 'BKG' + doc.seq; // Modified to 'Booking_Id'
        }
        next();
    } catch (error) {
        next(error);
    }
});


export const createVehicle = mongoose.model('bookings',vehicleSchema);

