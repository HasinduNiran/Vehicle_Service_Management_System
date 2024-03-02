import mongoose from "mongoose";
const packageSchema = mongoose.Schema({
    pakgname : {
        type : String,
        requird: true,
    },
    pkgdiscription : {
        type : String,
        required : true
    },
    // pkgimage : {
    //     type :Image,
    //     required : true
    // },
    includes : {
        type :String
    }
})//changed

export const Package = mongoose.model('package',packageSchema);


