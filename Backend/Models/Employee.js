import mongoose from "mongoose";

const employeeSchema = mongoose.Schema(
    {
    EmpID: {
        type: String,
        unique: true
    },
    employeeName: {
        type: String,
        required: true,
    },
    DOB: {
        type: String,
        required: true,
    },
    NIC: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    BasicSalary: {
        type: String,
        required: true,
    },
    ContactNo: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },

    }
);

const counterSchema = mongoose.Schema({
    _id: { type: String, required: true},
    seq: { type: Number, default: 1 }
});

const ECounterr = mongoose.model('ECounterr', counterSchema);

employeeSchema.pre('save', async function (next) {
    try{
        if (this.isNew) {
            const doc = await ECounterr.findOneAndUpdate({ _id: 'EmpID' }, { $inc: { seq: 1 } }, { new: true, upsert: true });
            this.EmpID = 'EMP' + doc.seq; // Modified to 'EmpID'
        }
        next();
    } catch (error) {
        next(error);
    }
});

export const Employee = mongoose.model('Employee' ,employeeSchema);