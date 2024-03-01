// Importing the Express library
import express from "express";

// Importing the Feedback model
import { Feedback } from "../Models/Feedback";

// Creating an Express router
const router = express.Router();

// Post route to create new feedback
router.post('/', async (request, response) => {
    try {
        // Checking if all required fields are present in the request body
        if (!request.body.name ||
            !request.body.email ||
            !request.body.phone_number ||
            !request.body.employee ||
            !request.body.date_of_service ||
            !request.body.message) {
            return response.status(400).send({
                message: 'Send all required fields',
            });
        }

        // Creating a new Feedback with the provided data
        const newFeedback = {
            name: request.body.name,
            email: request.body.email,
            phone_number: request.body.phone_number,
            employee: request.body.employee,
            date_of_service: request.body.date_of_service,
            message: request.body.message,
        };

        // Adding the new Feedback to the database
        const feedback = await Feedback.create(newFeedback);

        // Sending the created feedback as a JSON response
        return response.status(201).send(feedback);
    } catch (error) {
        // Handling errors and sending an error response
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for retrieving all feedback from the database
router.get('/', async (request, response) => {
    try {
        // Fetching all Feedback from the database
        const feedback = await Feedback.find({});

        // Sending the fetched Feedback as a JSON response
        response.status(200).json({
            count: feedback.length,
            data: feedback
        });
    } catch (error) {
        // Handling errors and sending an error response
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for retrieving a specific feedback item by ID
router.get('/:id', async (request, response) => {
    try {
        // Extracting the Feedback ID from the request parameters
        const { id } = request.params;

        // Fetching a feedback item from the database based on the ID
        const feedback = await Feedback.findById(id);

        if (!feedback) {
            return response.status(404).send({ message: 'Feedback not found' });
        }

        // Sending the fetched feedback item as a JSON response
        response.status(200).json(feedback);
    } catch (error) {
        // Handling errors and sending an error response
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for updating a Feedback by ID
router.put('/:id', async (request, response) => {
    try {
        // Validating that all required fields are provided in the request body
        if (
            !request.body.name ||
            !request.body.email ||
            !request.body.phone_number ||
            !request.body.employee ||
            !request.body.date_of_service ||
            !request.body.message
        ) {
            return response.status(400).send({
                message: 'Send all required fields',
            });
        }

        // Extracting the Feedback ID from the request parameters
        const { id } = request.params;
        
        // Updating the Feedback in the database using findByIdAndUpdate
        await Feedback.findByIdAndUpdate(id, request.body);

        // Sending a success response
        return response.status(200).send({ message: 'Feedback updated successfully' });

    } catch (error) {
        // Handling errors and sending an error response
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for deleting a Feedback by ID
router.delete('/:id', async(request, response) => {
    try {
        // Extracting the feedback ID from the request parameters
        const { id } = request.params;

        // Attempting to delete the feedback item from the database
        await Feedback.findByIdAndDelete(id);

        // Sending a success response
        return response.status(200).send({ message: 'Feedback deleted successfully' });

    } catch (error) {
        // Handling errors and sending an error response
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Exporting the Express router
export default router;
