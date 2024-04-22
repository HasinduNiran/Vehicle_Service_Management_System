// Importing the Express library
import express from 'express';

import mongoose from 'mongoose';

// Importing the Vehicle model 
import { Vehicle } from '../Models/Vehicle.js';

// Creating an Express router
const router = express.Router();

// Route for creating a new vehicle
router.post('/', async (request, response) => {
    try {

        //checkin vehicle number if available

        const vehiclenum = await Vehicle.findOne({
            Register_Number: request.body.Register_Number
        });
        if (vehiclenum) {
            return response.status(400).send({
                message: 'Vehicle number already exists',
            });
        }

        // Checking if all required fields are present in the request body
        if (!request.body.Register_Number ||
            !request.body.Make ||
            !request.body.Model ||
            !request.body.Year ||
            !request.body.Engine_Details ||
            !request.body.Transmission_Details ||
            !request.body.Vehicle_Color ||
            !request.body.Vehicle_Features ||
            !request.body.Condition_Assessment ||
            !request.body.Owner) {
            return response.status(400).send({
                message: 'Please provide all required fields',
            });
        }

        // Creating a new Vehicle item with the provided data
        const newVehicle = {
            cusID: request.body.cusID,
            image: request.body.image,
            Register_Number: request.body.Register_Number,
            Make: request.body.Make,
            Model: request.body.Model,
            Year: request.body.Year,
            Engine_Details: request.body.Engine_Details,
            Transmission_Details: request.body.Transmission_Details,
            Vehicle_Color: request.body.Vehicle_Color,
            Vehicle_Features: request.body.Vehicle_Features,
            Condition_Assessment: request.body.Condition_Assessment,
            Owner: request.body.Owner
        };

        // Adding the new Vehicle item to the database
        const createdVehicle = await Vehicle.create(newVehicle);

        // Sending the created Vehicle item as a JSON response
        return response.status(201).send(createdVehicle);
    } catch (error) {
        // Handling errors and sending an error response
        console.error(error.message);
        response.status(500).send({ message: 'Error creating new vehicle' });
    }
});

// Route for retrieving all Vehicle items from the database
router.get('/', async (request, response) => {
    try {
        // Fetching all Vehicle items from the database
        const vehicles = await Vehicle.find({});

        // Sending the fetched Vehicle items as a JSON response
        response.status(200).json({
            count: vehicles.length,
            data: vehicles
        });
    } catch (error) {
        // Handling errors and sending an error response
        console.error(error.message);
        response.status(500).send({ message: 'Error fetching vehicles' });
    }
});

// Route for retrieving a specific Vehicle by ID
router.get('/:identifier', async (request, response) => {
    try {
        // Extracting the identifier from the request parameters
        const { identifier } = request.params;

        // Checking if the provided identifier is a valid MongoDB ObjectId
        if (mongoose.Types.ObjectId.isValid(identifier)) {
            // Fetching a vehicle from the database based on the ID
            const vehicleById = await Vehicle.findById(identifier);
            if (vehicleById) {
                // Sending the fetched vehicle as a JSON response if found by ID
                return response.status(200).json(vehicleById);
            }
        }

        // If the provided identifier is not a valid ObjectId, try searching by register number
        let vehicleResult = await Vehicle.findOne({ Register_Number: identifier });

        // If no vehicle found by register number, try searching by cusID
        if (!vehicleResult) {
            vehicleResult = await Vehicle.find({ cusID: identifier });
        }

        // Sending the fetched vehicle as a JSON response if found
        if (vehicleResult) {
            return response.status(200).json(vehicleResult);
        }

        // If no vehicle found by either ID, register number, or cusID, send a 404 Not Found response
        return response.status(404).json({ message: 'Vehicle not found' });
    } catch (error) {
        // Handling errors and sending an error response with detailed error message
        console.error(error);
        response.status(500).send({ message: 'Error fetching vehicle: ' + error.message });
    }
});



// Route for updating a Vehicle item by ID
router.put('/:id', async (request, response) => {
    try {
        // Validating that all required fields are provided in the request body
        if (!request.body.Register_Number ||
            !request.body.Make ||
            !request.body.Model ||
            !request.body.Year ||
            !request.body.Engine_Details ||
            !request.body.Transmission_Details ||
            !request.body.Vehicle_Color ||
            !request.body.Vehicle_Features ||
            !request.body.Condition_Assessment ||
            !request.body.Owner) {
            return response.status(400).send({
                message: 'Please provide all required fields'
            });
        }

    //   //checkin vehicle number if available
    //   const vehiclenum = await Vehicle.findOne({
    //       Register_Number: request.body.Register_Number
    //   });
    //   if (vehiclenum) {
    //       return response.status(400).send({
    //           message: 'Vehicle number already exists',
    //       });
    //   }

        // Extracting the Vehicle item ID from the request parameters
        const { id } = request.params;

        // Updating the Vehicle item in the database using findByIdAndUpdate
        await Vehicle.findByIdAndUpdate(id, request.body);

        // Sending a success response
        return response.status(200).send({ message: 'Vehicle updated successfully' });
    } catch (error) {
        // Handling errors and sending an error response
        console.error(error.message);
        response.status(500).send({ message: 'Error updating vehicle' });
    }
});


// Route for deleting a Vehicle item by ID
router.delete('/:id', async (request, response) => {
    try {
        // Extracting the vehicle ID from the request parameters
        const { id } = request.params;

        // Attempting to delete the vehicle from the database
        await Vehicle.findByIdAndDelete(id);

        // Sending a success response
        return response.status(200).send({ message: 'Vehicle deleted successfully' });

    } catch (error) {
        // Handling errors and sending an error response
        console.log(error.message);
        response.status(500).send({ message: 'Error deleting vehicle' });
    }
});
router.get("searchvehicle", function (req, res) {
    var search = req.query.search;
    console.log(search);
    Vehicle.find({
        $or: [
            { Register_Number: { $regex: search, $options: "i" } },
            { Make: { $regex: search, $options: "i" } },
            { Model: { $regex: search, $options: "i" } },
            { Year: { $regex: search, $options: "i" } },
            { Engine_Details: { $regex: search, $options: "i" } },
            { Transmission_Details: { $regex: search, $options: "i" } },
            { Vehicle_Color: { $regex: search, $options: "i" } },
            { Vehicle_Features: { $regex: search, $options: "i" } },
            { Condition_Assessment: { $regex: search, $options: "i" } },
            { Owner: { $regex: search, $options: "i" } }
        ]
    }, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(result);
        }
    });
});








// Exporting the Express router
export default router;
