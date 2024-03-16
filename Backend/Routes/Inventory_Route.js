// Importing the Express library
import express from 'express';

// Importing the Inventory model 
import { Inventory } from '../Models/Inventory.js';

// Creating an Express router
const router = express.Router();

// Route for creating a new Inventory item
router.post('/', async (request, response) => {
    try {
        const requiredFields = [
            "Name",
            "Location",
            "Quantity",
            "PurchasedPrice",
            "SellPrice",
            "SupplierName",
            "SupplierPhone"
        ];

        for (const field of requiredFields) {
            if (!request.body[field]) {
                return response.status(400).send({ message: `Missing field: ${field}` });
            }
        }

        const newInventory = {
            Name: request.body.Name,
            Location: request.body.Location,
            Quantity: request.body.Quantity,
            PurchasedPrice: request.body.PurchasedPrice,
            SellPrice: request.body.SellPrice,
            SupplierName: request.body.SupplierName,
            SupplierPhone: request.body.SupplierPhone
        };

        const inventory = await Inventory.create(newInventory);
        
        return response.status(201).send(inventory);
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for retrieving all inventory items from the database
router.get('/', async (request, response) => {
    try {
        const inventory = await Inventory.find({});
        response.status(200).json({ count: inventory.length, data: inventory });
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for retrieving a specific inventory item by ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const inventory = await Inventory.findById(id);
        if (!inventory) {
            return response.status(404).send({ message: "Inventory not found" });
        }
        response.status(200).json(inventory);
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for updating an inventory item by ID
router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const updatedInventory = request.body;

        const inventory = await Inventory.findByIdAndUpdate(id, updatedInventory, { new: true });

        if (!inventory) {
            return response.status(404).send({ message: "Inventory not found" });
        }

        response.status(200).send({ message: 'Inventory updated successfully', data: inventory });

    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for deleting an inventory item by ID
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const inventory = await Inventory.findByIdAndDelete(id);
        if (!inventory) {
            return response.status(404).send({ message: "Inventory not found" });
        }
        response.status(200).send({ message: 'Inventory deleted successfully' });
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Exporting the Express router
export default router;
