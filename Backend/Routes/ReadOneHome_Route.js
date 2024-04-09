import express from 'express';
import mongoose from 'mongoose';

import { HomeReadOne } from '../Models/ReadOneHome.js';

const router = express.Router();

// Route for read one home

router.post('/', async (request, response) => {
    try {
        const newHome = {
            cusID: request.body.cusID,
            username: request.body.username,

        };
        const newHomeReadOne = new HomeReadOne(newHome);
        const result = await newHomeReadOne.save();
        response.json(result);
        return response.status(200).send(result);
        } catch (error) {
            console.error(error.message);
            response.status(500).send({ message: error.message });
        }
    }
);
router.get('/:identifier', async (request, response) => {
    try {
        // Extracting the identifier from the request parameters
        const { identifier } = request.params;

        // Checking if the provided identifier is a valid MongoDB ObjectId
        if (mongoose.Types.ObjectId.isValid(identifier)) {
            // Fetching a vehicle from the database based on the ID
            const cuByID = await HomeReadOne.findById(identifier);
            if (cuByID) {
                // Sending the fetched vehicle as a JSON response if found by ID
                return response.status(200).json(cuByID);
            }
        }

        // If the provided identifier is not a valid ObjectId, try searching by register number
        const customerByCUSID = await HomeReadOne.findOne({ cusID: identifier });
        if (customerByCUSID) {
            // Sending the fetched vehicle as a JSON response if found by register number
            return response.status(200).json(customerByCUSID);
        }

        // If no vehicle found by either ID or register number, send a 404 Not Found response
        return response.status(404).json({ message: 'Customer not found' });
    } catch (error) {
        // Handling errors and sending an error response with detailed error message
        console.error(error);
        response.status(500).send({ message: 'Error fetching Customer: ' + error.message });
    }
});

export { router as ReadOneHome_Route };