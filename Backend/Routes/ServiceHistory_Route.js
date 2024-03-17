import express, { response } from 'express';

import { serviceHistory } from '../Models/ServiceHistory.js';


const router = express.Router();

// Route for save a new reservation

router.post('/', async (request, response) => {
    try {
        if (
            !request.body.Customer_Name ||
            !request.body.Allocated_Employee ||
            !request.body.Vehicle_Number ||
            !request.body.Service_History
        ) {
            return response.status(400).send({
                message: 'Send all required field'
            });
        }
        const newServiceHistory = new serviceHistory({
            Customer_Name: request.body.Customer_Name,
            Allocated_Employee: request.body.Allocated_Employee,
            Vehicle_Number: request.body.Vehicle_Number,
            Service_History: request.body.Service_History
        });
        const result = await newServiceHistory.save();
        return response.status(201).send(result);

    } catch (error) {
        console.log(error.message);
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

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const serviceHistories = await serviceHistory.findById(id);
        return response.status(200).json(serviceHistories);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.put('/:id', async (request, response) => {
    try {
        if (
         !request.body.Customer_Name ||
         !request.body.Allocated_Employee ||
         !request.body.Vehicle_Number ||
         !request.body.Service_History
        ) {
            return response.status(400).send({
                message: 'Send all required field'
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

export default router;