import { Schema, model } from "mongoose";

// Defining the Feedback Schema
const feedbackSchema = Schema({
    cusID: {
        type: String,
        
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
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
        type: Number,
        required: true,
    },
}, { timestamps: true });

// Exporting the Feedback Model
export default model('Feedback', feedbackSchema);
