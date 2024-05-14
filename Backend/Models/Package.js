
// Package.js
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
    includes: [String], // Change includes to an array of strings
    Price: {
        type: Number,
        required: true,
    },
    exp:{
        type: String,
    }
});

export const PackageModel = mongoose.model('Package', packageSchema);
