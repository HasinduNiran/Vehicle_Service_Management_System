const mongoose= require ('mongoose');
const schema = mongoose.Schema;
const packageSchema = new Schema({
    pakgname : {
        type : String,
        requird: true,
    },
    pkgdiscription : {
        type : String,
        required : true
    },
    pkgimage : {
        type :Image,
        required : true
    },
    includes : {
        type :string
    },
    extraFetures :{
        type : string
    }
})

const package = mongoose.model("package", packageSchema);
module.exports = package;

