import express from 'express';
import { Customer } from '../Models/UserAccount.js';

const router = express.Router();

router.post('/', async (request, response) => {
    try {
        const newCustomer = {
            cusID:request.body.cusID,
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            NIC: request.body.NIC,
            phone: request.body.phone,
            email: request.body.email,
            username: request.body.username,
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

router.get('/:id', async (request, response) => {
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
});

router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Customer.findByIdAndUpdate(id, request.body, { new: true });
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
                { username: { $regex: new RegExp(search, 'i') } },
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
        const { username, password } = request.body;
        if (!username || !password) {
            return response.status(400).send({ message: 'Username and password are required' });
        }
        const customer = await Customer.findOne({ username });
        if (!customer) {
            return response.status(404).send({ message: 'User not found' });
        }
        if (password !== customer.password) {
            return response.status(401).send({ message: 'Incorrect password' });
        }
        response.status(200).send(customer);
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: 'Internal Server Error' });
    }
});

export default router;
