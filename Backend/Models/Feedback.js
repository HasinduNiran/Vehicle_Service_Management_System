import mongoose from "mongoose";

// Defining the Feedback Schema
const feedbackSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String, // Changed type from Number to String
        required: true,
    },
    employee: {
        type: String,
        required: true,
    },
    date_of_service:{
        type: Date,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    star_rating: {
        type: String ,
        required: true,
    },
}, { timestamps: true });

// Exporting the Feedback Model
export const Feedback = mongoose.model('Feedback', feedbackSchema);
