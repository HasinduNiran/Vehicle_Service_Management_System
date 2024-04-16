import mongoose from 'mongoose';

//const Schema = mongoose.Schema;

// Define the schema for the vehicle
const vehicleSchema = mongoose.Schema({
    cusID: {
        type: String, // Changed to String type for custom format
        unique: true
    },

    image: { type: String,
        required: true

    },
    
    Register_Number: {
        type: String,
        required: true
    },
    Make: {
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
    Transmission_Details: {
        type: String,
        required: true
    },

    Vehicle_Color: {
        type: String,
        required: true
    },
    Vehicle_Features: {
        type: [String], // Defines an array of strings
        required: true
    }
    ,
    Condition_Assessment: {
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
export const Vehicle = mongoose.model('Vehicle', vehicleSchema);
