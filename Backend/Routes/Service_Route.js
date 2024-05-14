import express from 'express';
import { serviceModel } from '../Models/Service.js';

const router = express.Router();

// Add a Service
router.post('/', async (request, response) => {
    try {
        if (!request.body.Servicename || !request.body.Price) {
            return response.status(400).send({ message: "Servicename and Price are required" });
        }

        const newService = {
            Servicename: request.body.Servicename,
            Price: request.body.Price
        };

        const createdService = await serviceModel.create(newService);

        return response.status(201).json(createdService);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Read all Services
router.get('/', async (request, response) => {
    try {
        const Services = await serviceModel.find({});
        response.status(200).json({
            count: Services.length,
            data: Services,
        });
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Read a Service by ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const Service = await serviceModel.findById(id);

        if (!Service) {
            return response.status(404).json({ message: 'Service not found' });
        }

        response.status(200).json(Service);
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Update a Service by ID
router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const updatedService = await serviceModel.findByIdAndUpdate(id, request.body, {
            new: true, // Return the modified document rather than the original
            runValidators: true, // Run model validation before updating
        });

        if (!updatedService) {
            return response.status(404).json({ message: 'Service not found' });
        }

        response.status(200).json({ message: 'Service updated successfully', data: updatedService });
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Delete a Service by ID
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const deletedService = await serviceModel.findByIdAndDelete(id);

        if (!deletedService) {
            return response.status(404).json({ message: 'Service not found' });
        }

        response.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Search for a Service
router.get("/searchService", async (req, res) => {
    try {
        const search = req.query.search;
        const result = await serviceModel.find({
            Servicename: { $regex: new RegExp(search, "i") } // Case-insensitive search
        });

        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
