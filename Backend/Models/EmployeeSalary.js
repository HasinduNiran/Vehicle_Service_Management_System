import mongoose from "mongoose";

const employeeSalarySchema = mongoose.Schema(
    {
    EmpID: {
        type: String,
        required: true,
    },
    employeeName: {
        type: String,
        required: true,
    },
    fromDate: {
        type: String,
        required: true,
    },
    toDate: {
        type: String,
        required: true,
    },
    totalOThours: {
        type: Number,
        //required: true,
    },
    totalOTpay: {
        type: Number,
        //required: true,
    },
    // totalWorkedhours: {
    //     type: Number,
    //     //required: true,
    // },
    BasicSalary: {
        type: Number,
        required: true,
    },
    TotalSalary: {
        type: Number,
        //required: true,
    },

    }
);

export const EmployeeSalary = mongoose.model('EmployeeSalary' ,employeeSalarySchema);