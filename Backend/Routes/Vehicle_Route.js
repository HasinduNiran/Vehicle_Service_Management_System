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
        // Checking if all required fields are present in the request body
        if (!request.body.Register_Number ||
             !request.body.Model || 
             !request.body.Owner) {
            return response.status(400).send({
                message: 'Please provide all required fields',
            });
        }

        // Creating a new Vehicle item with the provided data
        const newVehicle = {
          Register_Number: request.body.Register_Number,
          Model: request.body.Model,
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
        const vehicleByRegisterNumber = await Vehicle.findOne({ Register_Number: identifier });
        if (vehicleByRegisterNumber) {
            // Sending the fetched vehicle as a JSON response if found by register number
            return response.status(200).json(vehicleByRegisterNumber);
        }

        // If no vehicle found by either ID or register number, send a 404 Not Found response
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
        if (!request.body.Register_Number || !request.body.Model || !request.body.Owner) {
            return response.status(400).send({
                message: 'Please provide all required fields'
            });
        }

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
router.delete('/:id', async(request, response) => {
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
            { Model: { $regex: search, $options: "i" } },
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
