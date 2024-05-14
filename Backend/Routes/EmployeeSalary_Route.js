import express from 'express';
import { EmployeeSalary } from '../Models/EmployeeSalary.js';

const router = express.Router();

// Route for Save a new EmployeeSalary
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.EmpID ||
      !request.body.employeeName ||
      !request.body.fromDate ||
      !request.body.toDate 
      // !request.body.totalOThours ||
      // !request.body.totalOTpay ||
      // !request.body.totalWorkedhours ||
      // !request.body.BasicSalary ||
      // !request.body.TotalSalary

    ) {
      return response.status(400).send({
        message: 'Send all required fields: EmpID, employeeName, fromDate,toDate, totalOThours, totalOTpay, BasicSalary,TotalSalary',
      });
    }
    const newEmployeeSalary = {
      EmpID: request.body.EmpID,
      employeeName: request.body.employeeName,
      fromDate: request.body.fromDate,
      toDate: request.body.toDate,
      totalOThours: request.body.totalOThours || null,
      totalOTpay: request.body.totalOTpay || null,
      //totalWorkedhours: request.body.totalWorkedhours || null,
      BasicSalary: request.body.BasicSalary || null,
      TotalSalary: request.body.TotalSalary || null,
    };

    const EmployeeSalaries = await EmployeeSalary.create(newEmployeeSalary);

    return response.status(201).send(EmployeeSalaries);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All EmployeeSalary from database
router.get('/', async (request, response) => {
  try {
    const EmployeeSalaries = await EmployeeSalary.find({});

    return response.status(200).json({
      count: EmployeeSalaries.length,
      data: EmployeeSalaries,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Employee from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const EmployeeSalaries = await EmployeeSalary.findById(id);

    return response.status(200).json(EmployeeSalaries);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update an employee
router.put('/:id', async (request, response) => {
  try {
    const {
      EmpID,
      employeeName,
      fromDate,
      toDate,
      totalOThours,
      totalOTpay,
      //totalWorkedhours,
      BasicSalary,
      TotalSalary
    } = request.body;

    if (
      !EmpID ||
      !employeeName ||
      !fromDate ||
      !toDate ||
      totalOThours === undefined ||
      totalOTpay === undefined ||
      //totalWorkedhours === undefined ||
      BasicSalary === undefined ||
      TotalSalary === undefined
    ) {
      return response.status(400).send({
        message: 'Send all required fields: EmpID, employeeName, fromDate, toDate, totalOThours, totalOTpay, BasicSalary, TotalSalary',
      });
    }

    const { id } = request.params;

    const result = await EmployeeSalary.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'EmployeeSalary not found' });
    }

    return response.status(200).send({ message: 'EmployeeSalary updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


// Route for Delete an employee
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await EmployeeSalary.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'EmployeeSalary not found' });
    }

    return response.status(200).send({ message: 'EmployeeSalary deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// GET route for retrieving EmployeeSalary based on search criteria, pagination, and sorting
router.get("/searchEmployeeSalary", async (req, res) => {
  try {
    // Destructuring the request query with default values
    const { page = 1, limit = 8, search = "", sort = "EmpID" } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    // Regular expression for case-insensitive search
    const query = {
      $or: [
        { EmpID: { $regex: new RegExp(search, 'i') } }, // Using RegExp instead of directly passing $regex
        { employeeName: { $regex: new RegExp(search, 'i') } },
        { fromDate: { $regex: new RegExp(search, 'i') } },
        { toDate: { $regex: new RegExp(search, 'i') } },
        { totalOThours: { $regex: new RegExp(search, 'i') } },
        { totalOTpay: { $regex: new RegExp(search, 'i') } },
        //{ totalWorkedhours: { $regex: new RegExp(search, 'i') } },
        { BasicSalary: { $regex: new RegExp(search, 'i') } },
        { TotalSalary: { $regex: new RegExp(search, 'i') } },
      ],
    };
    // Using await to ensure that sorting and pagination are applied correctly
    const EmployeeSalary = await EmployeeSalary.find(query)
      .sort({ [sort]: 1 }) // Sorting based on the specified field
      .skip(skip)
      .limit(parseInt(limit));
    res.status(200).json({ count: EmployeeSalary.length, data: EmployeeSalary });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});


export default router;