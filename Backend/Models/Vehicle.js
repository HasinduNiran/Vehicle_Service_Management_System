
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({

    Register_Number: {
        type: String,
        required: true
    },
    Model: {
        type: String,
        required: true
    },
    Owner: {
        type: String,
        required: true
    }

})

const vehicle = mongoose.model("vehicle", vehicleSchema);

module.exports = vehicle;