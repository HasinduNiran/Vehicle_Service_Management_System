import express from 'express';
import { Employee } from '../Models/Employee.js';

const router = express.Router();

// Route for Save a new Employee
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.EmpID ||
      !request.body.employeeName ||
      !request.body.DOB ||
      !request.body.NIC ||
      !request.body.Address ||
      !request.body.Position ||
      !request.body.ContactNo ||
      !request.body.Email

    ) {
      return response.status(400).send({
        message: 'Send all required fields: EmpID, employeeName, DOB, NIC, Address, Position, ContactNo,Email',
      });
    }
    const newEmployee = {
      EmpID: request.body.EmpID,
      employeeName: request.body.employeeName,
      DOB: request.body.DOB,
      NIC: request.body.NIC,
      Address: request.body.Address,
      Position: request.body.Position,
      ContactNo: request.body.ContactNo,
      Email: request.body.Email,
    };

    const employee = await Employee.create(newEmployee);

    return response.status(201).send(employee);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Employees from database
router.get('/', async (request, response) => {
  try {
    const employees = await Employee.find({});

    return response.status(200).json({
      count: employees.length,
      data: employees,
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

    const employee = await Employee.findById(id);

    return response.status(200).json(employee);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update an employee
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.EmpID ||
      !request.body.employeeName ||
      !request.body.DOB ||
      !request.body.NIC ||
      !request.body.Address ||
      !request.body.Position ||
      !request.body.ContactNo ||
      !request.body.Email
    ) {
      return response.status(400).send({
        message: 'Send all required fields: EmpID, employeeName, DOB, NIC, Address, Position, Salary',
      });
    }

    const { id } = request.params;

    const result = await Employee.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Employee not found' });
    }

    return response.status(200).send({ message: 'Employee updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete an employee
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Employee.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Employee not found' });
    }

    return response.status(200).send({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;