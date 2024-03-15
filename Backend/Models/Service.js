import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({
    servicename: {
        type: String,
        required: true,
    },
});

export const serviceModel = mongoose.model('service', serviceSchema);
