import mongoose from 'mongoose';

//const Schema = mongoose.Schema;

// Define the schema for the vehicle
const vehicleSchema = mongoose.Schema({
    Register_Number: {
        type: String,
        required: true
    },
    Model: {
        type: String,
        required: true
    },
    Owner: {
        type: String,
        required: true
    }
});

// Create a Mongoose model based on the schema
//const Vehicle = mongoose.model('Vehicle', vehicleSchema);

//module.exports = Vehicle;
export const Vehicle = mongoose.model('Vehicle',vehicleSchema);
