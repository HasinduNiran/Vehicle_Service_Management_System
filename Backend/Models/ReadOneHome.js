import mongoose from "mongoose";

const cusIDSchema = mongoose.Schema({
    cusID: {
        type: String, // Changed to String type for custom format
        
    },

    username: {
        type: String, // Changed to String type for custom format
        
    }
});

export const HomeReadOne = mongoose.model('HomeReadOne', cusIDSchema);
