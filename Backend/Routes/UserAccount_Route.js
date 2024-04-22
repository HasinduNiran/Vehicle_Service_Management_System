import express from 'express';
import mongoose from 'mongoose';

import { Customer } from '../Models/UserAccount.js';

const router = express.Router();

router.post('/', async (request, response) => {
    try {
        const newCustomer = {
            image:request.body.image,
            cusID:request.body.cusID,
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            NIC: request.body.NIC,
            phone: request.body.phone,
            email: request.body.email,
             password: request.body.password,
        };

        const customer = await Customer.create(newCustomer);

        return response.status(201).send(customer);
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get('/', async (request, response) => {
    try {
        const customers = await Customer.find({});
        response.status(200).json({
            count: customers.length,
            data: customers
        });
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

/*router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const customer = await Customer.findById(id);
        if (!customer) {
            return response.status(404).json({ message: 'Customer not found' });
        }
        response.status(200).json(customer);
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});*/
// Route for retrieving a specific Vehicle by ID
router.get('/:identifier', async (request, response) => {
    try {
        // Extracting the identifier from the request parameters
        const { identifier } = request.params;

        // Checking if the provided identifier is a valid MongoDB ObjectId
        if (mongoose.Types.ObjectId.isValid(identifier)) {
            // Fetching a vehicle from the database based on the ID
            const cuByID = await Customer.findById(identifier);
            if (cuByID) {
                // Sending the fetched vehicle as a JSON response if found by ID
                return response.status(200).json(cuByID);
            }
        }

        // If the provided identifier is not a valid ObjectId, try searching by register number
        const customerByCUSID = await Customer.findOne({ cusID: identifier });
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

router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const updateFields = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            NIC: request.body.NIC,
            phone: request.body.phone,
            email: request.body.email,
             password: request.body.password,
            image: request.body.image // Include image if you want to update it
        };
        const result = await Customer.findByIdAndUpdate(id, updateFields, { new: true });
        if (!result) {
            return response.status(404).json({ message: 'Customer not found' });
        }
        response.status(200).send({ message: 'Customer updated successfully' });
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});


router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Customer.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).json({ message: 'Customer not found' });
        }
        response.status(200).send({ message: 'Customer deleted successfully' });
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get("/searchCustomer", async (req, res) => {
    try {
        const { page = 1, limit = 7, search = "", sort = "NIC" } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const query = {
            $or: [
                { cusID: { $regex: new RegExp(search, 'i') } },
                { firstName: { $regex: new RegExp(search, 'i') } },
                { lastName: { $regex: new RegExp(search, 'i') } },
                { NIC: { $regex: new RegExp(search, 'i') } },
                { phone: { $regex: new RegExp(search, 'i') } },
                { email: { $regex: new RegExp(search, 'i') } },
                 { password: { $regex: new RegExp(search, 'i') } },
            ],
        };
        const customers = await Customer.find(query)
            .sort({ [sort]: 1 })
            .skip(skip)
            .limit(parseInt(limit));
        res.status(200).json({ count: customers.length, data: customers });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

router.post('/cLogin', async (request, response) => {
    try {
        const { cusID, password } = request.body;
        if (!cusID || !password) {
            return response.status(400).json({ message: 'cusID and password are required' });
        }
        const customer = await Customer.findOne({ cusID });
        if (!customer) {
            return response.status(404).json({ message: 'User not found' });
        }
        if (password !== customer.password) {
            return response.status(401).json({ message: 'Incorrect password' });
        }
        response.status(200).json(customer);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ message: 'Internal Server Error' });
    }
});


export default router;
