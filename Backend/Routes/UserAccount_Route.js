import express from 'express';
import { Customer } from '../Models/UserAccount.js';

const router = express.Router();

//add customer
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.firstName ||
            !request.body.lastName ||
            !request.body.NIC ||
            !request.body.phone || 
            !request.body.email ||
            !request.body.Username ||
            !request.body.password
        ) {
            return response.status(400).send({
                message: 'send all required fields: firstName,lastName,NIC,phone,email,password',
            });
        }
        const newCustomer = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            NIC: request.body.NIC,
            phone: request.body.phone,
            email: request.body.email,
            Username: request.body.Username,
            password: request.body.password,



        };

        const customer = await Customer.create(newCustomer);

        return response.status(201).send(customer);
    } catch (error) {
        console.log(err.message);
        response.status(500).send({ message: error.message });

    }
})


//read all
router.get('/', async (request, response) => {
    try {
        // Fetching Student data from the database
        const customer = await Customer.find({});

        // Sending the fetched Student as a JSON response with a status code of 200 (OK)
        response.status(200).json({
            count: customer.length,
            data: customer
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
        const customer = await Customer.findById(id);

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
            !request.body.firstName ||
            !request.body.lastName ||
            !request.body.NIC ||
            !request.body.phone ||
            !request.body.email ||
            !request.body.Username ||
            !request.body.password
        ) {
            return response.status(400).send({
                message: 'Send all required fields'
            });
        }

        // Extract the Student item ID from the request parameters
        const { id } = request.params;

        // Update the Student item in the database using findByIdAndUpdate
        const result = await Customer.findByIdAndUpdate(id, request.body);

        // Check if the Student item was not found in the database
        if (!result) {
            return response.status(404).json({ message: 'Customer not found' });
        }

        // Send a success response with a status code of 200 (OK)
        return response.status(200).send({ message: 'Customer updated successfully' });

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
        const result = await Customer.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Customer not found' });
        }
        return response.status(200).send({ message: 'Customer deleted successfully' });



    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });

    }
});

//loginCustomer

router.post('/cLogin', async (request, response) => {
    try {
        const { Username, password } = request.body;

        // Check if username and password are provided
        if (!Username || !password) {
            return response.status(400).send({
                message: 'Username and password are required',
            });
        }

        // Find the user with the provided username
        const customer = await Customer.findOne({ Username });

        // If the user is not found, return an error
        if (!customer) {
            return response.status(404).send({
                message: 'User not found',
            });
        }

        // Check if the password matches
        if (password !== customer.password) {
            return response.status(401).send({
                message: 'Incorrect password',
            });
        }

        // If username and password are correct, return the user data
        response.status(200).send(customer);

    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: 'Internal Server Error' });
    }
});


export default router;