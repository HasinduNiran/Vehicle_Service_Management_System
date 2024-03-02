import mongoose from "mongoose";

const packageSchema = mongoose.Schema({
    pakgname: {
        type: String,
        required: true,
    },
    pkgdescription: {
        type: String,
        required: true,
    },
    includes: {
        type: String, // Assuming it's a string, update the type accordingly if needed
    },
});

export const PackageModel = mongoose.model('Package', packageSchema);
