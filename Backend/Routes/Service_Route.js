import express from 'express';
import { serviceModel } from '../Models/service.js';

const router = express.Router();

// Add a service
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.pakgname
        ) {
            return response.status(400).send({
                message: 'Send all required fields: pakgname, pkgdescription, includes',
            });
        }

        const newservice = {
            pakgname: request.body.pakgname
        };

        const createdservice = await serviceModel.create(newservice);

        return response.status(201).json(createdservice);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Read all services
router.get('/', async (request, response) => {
    try {
        const services = await serviceModel.find({});
        response.status(200).json({
            count: services.length,
            data: services,
        });
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Read a service by ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const service = await serviceModel.findById(id);

        if (!service) {
            return response.status(404).json({ message: 'service not found' });
        }

        response.status(200).json(service);
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Update a service by ID
router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const updatedservice = await serviceModel.findByIdAndUpdate(id, request.body, {
            new: true, // Return the modified document rather than the original
            runValidators: true, // Run model validation before updating
        });

        if (!updatedservice) {
            return response.status(404).json({ message: 'service not found' });
        }

        response.status(200).json({ message: 'service updated successfully', data: updatedservice });
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Delete a service by ID
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const deletedservice = await serviceModel.findByIdAndDelete(id);

        if (!deletedservice) {
            return response.status(404).json({ message: 'service not found' });
        }

        response.status(200).json({ message: 'service deleted successfully' });
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
