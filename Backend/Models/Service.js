import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({
    pakgname: {
        type: String,
        required: true,
    },
});

export const serviceModel = mongoose.model('service', serviceSchema);
