// Importing the Express library
import express from 'express';

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
router.get('/:id', async (request, response) => {
    try {
        // Extracting the Vehicle item ID from the request parameters
        const { id } = request.params;

        // Fetching a vehicle from the database based on the ID
        const vehicle = await Vehicle.findById(id);
        
        // Sending the fetched vehicle as a JSON response
        response.status(200).json(vehicle);
    } catch (error) {
        // Handling errors and sending an error response
        console.error(error.message);
        response.status(500).send({ message: 'Error fetching vehicle' });
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

// Exporting the Express router
export default router;
