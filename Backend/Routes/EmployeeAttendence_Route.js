import express from 'express';
import { EmployeeAttendence } from '../Models/EmployeeAttendence.js';

const router = express.Router();

// Route for Save a new EmployeeAttendence
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.EmpID ||
      !request.body.employeeName ||
      !request.body.date 
      //!request.body.InTime ||
      //!request.body.OutTime 
      //!request.body.OThours 

    ) {
      return response.status(400).send({
        message: 'Send all required fields: EmpID, employeeName, date, InTime, OutTime, OThours',
      });
    }
    const newEmployeeAttendence = {
      EmpID: request.body.EmpID,
      employeeName: request.body.employeeName,
      date: request.body.date,
      InTime: request.body.InTime || null,  // Set to null if not provided
      OutTime: request.body.OutTime || null,  // Set to null if not provided
      WorkingHours: request.body.WorkingHours || null,
      OThours: request.body.OThours || null,
      
    };

    const employeeAttendence = await EmployeeAttendence.create(newEmployeeAttendence);

    return response.status(201).send(employeeAttendence);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All EmployeeAttendence from database
router.get('/', async (request, response) => {
  try {
    const employeesattendence = await EmployeeAttendence.find({});

    return response.status(200).json({
      count: employeesattendence.length,
      data: employeesattendence,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One EmployeeAttendence from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const employeeAttendence = await EmployeeAttendence.findById(id);

    return response.status(200).json(employeeAttendence);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting all attendance records of one employee from the database by employee ID
// router.get('/:id', async (request, response) => {
//     try {
//       const { id } = request.params;
  
//       const employeeAttendances = await EmployeeAttendence.find({ EmpID: id });
  
//       return response.status(200).json(employeeAttendances);
//     } catch (error) {
//       console.error(error.message);
//       response.status(500).send({ message: 'Error retrieving employee attendance' });
//     }
//   });
  
// Route for Update an employee
router.put('/:id', async (request, response) => {
  try {
    const id = request.params.id;
    const existingAttendance = await EmployeeAttendence.findById(id);

    if (!existingAttendance) {
      return response.status(404).send({ message: 'Attendance record not found' });
    }

    // Update only the fields that are provided in the request body
    if (request.body.EmpID) {
      existingAttendance.EmpID = request.body.EmpID;
    }
    if (request.body.employeeName) {
      existingAttendance.employeeName = request.body.employeeName;
    }
    if (request.body.date) {
      existingAttendance.date = request.body.date;
    }
    if (request.body.hasOwnProperty('InTime')) {
      existingAttendance.InTime = request.body.InTime;
    }
    if (request.body.hasOwnProperty('OutTime')) {
      existingAttendance.OutTime = request.body.OutTime;
    }
    if (request.body.hasOwnProperty('WorkingHours')) {
      existingAttendance.WorkingHours = request.body.WorkingHours;
    }
    if (request.body.hasOwnProperty('OThours')) {
      existingAttendance.OThours = request.body.OThours;
    }

    // Save the updated attendance record
    const updatedAttendance = await existingAttendance.save();

    return response.status(200).send(updatedAttendance);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});




// Route for updating employee attendance
// router.put('/:EmpID/:date', async (request, response) => {
//   try {
//     const { EmpID, date } = request.params;

//     // Check if the request body contains required fields for updating attendance
//     if (
//       !request.body.InTime ||
//       !request.body.OutTime ||
//       !request.body.OThours
//     ) {
//       return response.status(400).send({
//         message: 'Send all required fields: InTime, OutTime, OThours',
//       });
//     }

//     const { InTime, OutTime, OThours } = request.body;

//     // Find the employee attendance record by EmpID and date and update it
//     const result = await EmployeeAttendence.findOneAndUpdate(
//       { EmpID: EmpID, date: date },
//       { InTime: InTime, OutTime: OutTime, OThours: OThours },
//       { new: true }
//     );

//     if (!result) {
//       return response.status(404).json({ message: 'Attendance record not found' });
//     }

//     return response.status(200).send({ message: 'Attendance record updated successfully' });
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

  

// Route for Delete an employeeAttendence
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await EmployeeAttendence.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Employee not found' });
    }

    return response.status(200).send({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
  

// GET route for retrieving EmployeeAttendence based on search criteria, pagination, and sorting
router.get("/searchEmployeeAttendence", async (req, res) => {
  try {
    // Destructuring the request query with default values
    const { page = 1, limit = 7, search = "", sort = "EmpID" } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    // Regular expression for case-insensitive search
    const query = {
      $or: [
        { EmpID: { $regex: new RegExp(search, 'i') } }, // Using RegExp instead of directly passing $regex
        { employeeName: { $regex: new RegExp(search, 'i') } },
        { date: { $regex: new RegExp(search, 'i') } },
        { InTime: { $regex: new RegExp(search, 'i') } },
        { OutTime: { $regex: new RegExp(search, 'i') } },
        { WorkingHours: { $regex: new RegExp(search, 'i') } },
        { OThours: { $regex: new RegExp(search, 'i') } },
        
      ],
    };
    // Using await to ensure that sorting and pagination are applied correctly
    const employeesAttendence = await EmployeeAttendence.find(query)
      .sort({ [sort]: 1 }) // Sorting based on the specified field
      .skip(skip)
      .limit(parseInt(limit));
    res.status(200).json({ count: employeesAttendence.length, data: employeesAttendence });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});


export default router;