const mongoose= require ('mongoose');
const schema = mongoose.Schema({
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
    }
})//changed

export const Package = mongoose.model('package',packageSchema);


