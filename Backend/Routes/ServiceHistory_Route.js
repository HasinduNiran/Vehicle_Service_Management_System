import express, { response } from 'express';

import mongoose from 'mongoose';
import { Vehicle } from '../Models/Vehicle.js'; // Import the Vehicle model


import { serviceHistory } from '../Models/ServiceHistory.js';


const router = express.Router();

// Route for save a new reservation
router.post('/', async (request, response) => {
    try {
        // Check if the provided booking ID already exists in the service history
        const existingServiceHistory = await serviceHistory.findOne({ Booking_Id: request.body.Booking_Id });
        if (existingServiceHistory) {
            return response.status(400).send({
                message: 'This booking ID already has a service history associated with it.'
            });
        }

        // Validate other required fields
        if (
            !request.body.Customer_Name ||
            !request.body.Allocated_Employee ||
            !request.body.Vehicle_Number ||
            !request.body.Milage ||
            !request.body.Booking_Id ||
            !request.body.nextService ||
            !request.body.Service_Date ||
            !request.body.Service_History
        ) {
            return response.status(400).send({
                message: 'Send all required fields'
            });
        }
        // Check if the vehicle with the provided vehicle number exists in the Vehicle collection
        const existingVehicle = await Vehicle.findOne({ Register_Number: request.body.Vehicle_Number });
        if (!existingVehicle) {
            return response.status(400).send({
                message: 'Vehicle not found. Please register the vehicle first.'
            });
        }


        // Find the latest service history entry for the vehicle
        const latestServiceHistory = await serviceHistory.findOne({ Vehicle_Number: request.body.Vehicle_Number }).sort({ Service_Date: -1 });

        // Ensure that the provided mileage is greater than the previous service history entry's mileage
        if (latestServiceHistory && request.body.Milage <= latestServiceHistory.Milage) {
            return response.status(400).send({
                message: 'The provided mileage must be greater than the previous service history entry\'s mileage.'
            });
        }

        // Convert selectedServices to an array if it's not already
        const selectedServices = Array.isArray(request.body.selectedServices) ? request.body.selectedServices : [request.body.selectedServices];

        // Create a new service history entry
        const newServiceHistory = new serviceHistory({
            cusID: request.body.cusID,
            Customer_Name: request.body.Customer_Name,
            Customer_Email: request.body.Customer_Email,
            Allocated_Employee: request.body.Allocated_Employee,
            Vehicle_Number: request.body.Vehicle_Number,
            Milage: request.body.Milage,
            Package: request.body.Package,
            Booking_Id: request.body.Booking_Id,
            nextService: request.body.nextService,
            Service_History: request.body.Service_History,
            Service_Date: request.body.Service_Date,
            selectedServices: selectedServices // Ensure selectedServices is an array
        });

        // Save the new service history entry
        const result = await newServiceHistory.save();
        return response.status(201).send(result);
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Read service history

router.get('/', async (request, response) => {
    try {
        const serviceHistories = await serviceHistory.find({});
        response.status(200).json({
            count: serviceHistories.length,
            service: serviceHistories,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
router.get('/:identifier', async (request, response) => {
    try {
        const { identifier } = request.params;

        // Check if the provided identifier is a valid MongoDB ObjectId
        if (mongoose.Types.ObjectId.isValid(identifier)) {
            // Fetching a service history from the database based on the ID
            const serviceHistoryById = await serviceHistory.findById(identifier);
            if (serviceHistoryById) {
                // Sending the fetched service history as a JSON response if found by ID
                return response.status(200).json(serviceHistoryById);
            }
        }

        // If the provided identifier is not a valid ObjectId, try searching by vehicle number
        let serviceHistoryResult = await serviceHistory.find({ Vehicle_Number: identifier });

        // If no service history found by vehicle number, try searching by Booking_Id
        if (!serviceHistoryResult || serviceHistoryResult.length === 0) {
            serviceHistoryResult = await serviceHistory.find({ Booking_Id: identifier });
        }

        // If no service history found by Booking_Id, try searching by cusID
        if (!serviceHistoryResult || serviceHistoryResult.length === 0) {
            serviceHistoryResult = await serviceHistory.find({ cusID: identifier });
        }

        // Sending the fetched service history as a JSON response if found
        if (serviceHistoryResult && serviceHistoryResult.length > 0) {
            return response.status(200).json(serviceHistoryResult);
        }

        // If no service history found by either ID, vehicle number, or Booking_Id, send a 404 Not Found response
        return response.status(404).json({ message: 'Service history not found' });
    } catch (error) {
        // Handling errors and sending an error response with detailed error message
        console.error(error);
        response.status(500).send({ message: 'Error fetching service history: ' + error.message });
    }
});


router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.Customer_Name ||
            !request.body.Allocated_Employee ||
            !request.body.Vehicle_Number ||
            !request.body.Milage ||
           
            !request.body.Booking_Id ||
            !request.body.nextService ||
            !request.body.Service_Date ||
            !request.body.Service_History

        ) {
            return response.status(400).send({
                message: 'Send all required field'
            });
        }
        
        // Validate Milage to ensure it's not negative
        if (request.body.Milage < 0) {
            return response.status(400).send({
                message: 'Milage cannot be negative'
            });
        }
        const { id } = request.params;
        const updatedServiceHistory = await serviceHistory.findByIdAndUpdate(id, request.body);
        if (!updatedServiceHistory) {
            return response.status(404).send({ message: 'Service history not found' });
        }
        return response.status(200).send({ message: 'Service history updated' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});




router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await serviceHistory.findByIdAndDelete(id);
        return response.status(200).send({ message: 'Service history deleted' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
router.get('/searchservices', async function (request, response) {
    try {
        const search = request.query.search;
        const serviceHistories = await serviceHistory.find({
            $or: [
                { Customer_Name: { $regex: search, $options: 'i' } },
                { Customer_Email: { $regex: search, $options: 'i' } },
                { Allocated_Employee: { $regex: search, $options: 'i' } },
                { Vehicle_Number: { $regex: search, $options: 'i' } },
                { Milage: { $regex: search, $options: 'i' } },
                { Package: { $regex: search, $options: 'i' } },
                { Booking_Id: { $regex: search, $options: 'i' } },
                { nextService: { $regex: search, $options: 'i' } },
                { selectedServices: { $regex: search, $options: 'i' } },
                { Service_History: { $regex: search, $options: 'i' } },
                { Service_Date: { $regex: search, $options: 'i' } }

            ]
        });
        response.status(200).json(serviceHistories);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});






export default router;