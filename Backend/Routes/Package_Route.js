import express from 'express';
import { Package, Package, Package } from '../Models/Package.js';

const router = express.Router();

//add customer
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.pakgname ||
            !request.body.pkgdiscription ||
            !request.body.pkgimage ||
            !request.body.includes 

        ) {
            return response.status(400).send({
                message: 'send all required fields: pakgname,pkgdiscription,includes',
            });
        }
        const newPackage = {
            pakgname: request.body.pakgname,
            pkgdiscription: request.body.pkgdiscription,
            pkgimage: request.body.pkgimage,
            includes: request.body.includes
        };

        const Package = await Customer.create(newPackage);

        return response.status(201).send(Package);
    } catch (error) {
        console.log(err.message);
        response.status(500).send({ message: error.message });

    }
})


//read all
router.get('/', async (request, response) => {
    try {
        // Fetching Student data from the database
        const Package = await Package.find({});

        // Sending the fetched Student as a JSON response with a status code of 200 (OK)
        response.status(200).json({
            count: Package.length,
            data: Package
        });
    } catch (error) {
        // Logging the error to the console
        console.error(error.message);

        // Sending an error response with a status code of 500 (Internal Server Error)
        response.status(500).send({ message: error.message });
    }
});

//read a customer
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        // Fetching student data from the database
        const Package = await Package.findById(id);

        // Sending the fetched student as a JSON response with a status code of 200 (OK)
        response.status(200).json(customer)
    } catch (error) {
        // Logging the error to the console
        console.error(error.message);

        // Sending an error response with a status code of 500 (Internal Server Error)
        response.status(500).send({ message: error.message });
    }
});


//update a customer
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.pakgname ||
            !request.body.pkgdiscription ||
            !request.body.pkgimage ||
            !request.body.includes 
        ) {
            return response.status(400).send({
                message: 'Send all required fields'
            });
        }

        // Extract the Student item ID from the request parameters
        const { id } = request.params;

        // Update the Student item in the database using findByIdAndUpdate
        const result = await Package.findByIdAndUpdate(id, request.body);

        // Check if the Student item was not found in the database
        if (!result) {
            return response.status(404).json({ message: 'Package not found' });
        }

        // Send a success response with a status code of 200 (OK)
        return response.status(200).send({ message: 'Package updated successfully' });

    } catch (error) {
        // Log any errors to the console
        console.error(error.message);

        // Send an error response with a status code of 500 (Internal Server Error)
        response.status(500).send({ message: error.message });
    }
});


//delete a customer
router.delete('/:id', async (request, response) => {
    try {

        const { id } = request.params;
        const result = await Package.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Package not found' });
        }
        return response.status(200).send({ message: 'Package deleted successfully' });



    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });

    }
});

export default router;