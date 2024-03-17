import mongoose from "mongoose";

const managerSchema = mongoose.Schema(
    {
    Musername: {
        type: String,
        required: true,
    },
    Mpassword: {
        type: String,
        required: true,
    },
    
    }
);

export const Manager = mongoose.model('Manager' ,managerSchema);