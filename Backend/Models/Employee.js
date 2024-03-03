import mongoose from "mongoose";

const employeeSchema = mongoose.Schema(
    {
    EmpID: {
        type: String,
        required: true,
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
    Position: {
        type: String,
        required: true,
    },
    Salary: {
        type: String,
       // required: true,
    },
    }
);

export const Employee = mongoose.model('Employee' ,employeeSchema);