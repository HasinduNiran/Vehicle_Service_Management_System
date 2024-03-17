import express from 'express';
import { serviceHistory } from '../Models/ServiceHistory.js';

const router = express.Router();

// Route to save a new service history entry
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.Customer_Name ||
            !request.body.Allocated_Employee ||
            !request.body.Vehicle_Number ||
            !request.body.Service_History||
            !request.body.Service_Date
        ) {
            return response.status(400).send({
                message: 'Send all required fields'
            });
        }
        const newServiceHistory = new serviceHistory({
            Customer_Name: request.body.Customer_Name,
            Allocated_Employee: request.body.Allocated_Employee,
            Vehicle_Number: request.body.Vehicle_Number,
            Service_History: request.body.Service_History,
            Service_Date: request.body.Service_Date
        });
        const result = await newServiceHistory.save();
        return response.status(201).send(result);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Read all service history entries
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

// Read service history entry by Vehicle_Number
router.get('/:Vehicle_Number', async (request, response) => {
    try {
        const { Vehicle_Number } = request.params;
        const serviceHistories = await serviceHistory.find({ Vehicle_Number });
        return response.status(200).json(serviceHistories);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Update service history entry by Vehicle_Number
router.put('/:Vehicle_Number', async (request, response) => {
    try {
        if (
            !request.body.Customer_Name ||
            !request.body.Allocated_Employee ||
            !request.body.Vehicle_Number ||
            !request.body.Service_History||
            !request.body.Service_Date
        
        ) {
            return response.status(400).send({
                message: 'Send all required fields'
            });
        }
        const { Vehicle_Number } = request.params;
        const updatedServiceHistory = await serviceHistory.findOneAndUpdate({ Vehicle_Number }, request.body);
        if (!updatedServiceHistory) {
            return response.status(404).send({ message: 'Service history not found' });
        }
        return response.status(200).send({ message: 'Service history updated' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Delete service history entry by Vehicle_Number
router.delete('/:Vehicle_Number', async (request, response) => {
    try {
        const { Vehicle_Number } = request.params;
        const result = await serviceHistory.findOneAndDelete({ Vehicle_Number });
        return response.status(200).send({ message: 'Service history deleted' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
