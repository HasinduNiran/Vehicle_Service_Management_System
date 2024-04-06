import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({
    Servicename: {
        type: String,
        required: true,
    },
});

export const serviceModel = mongoose.model('service', serviceSchema);
