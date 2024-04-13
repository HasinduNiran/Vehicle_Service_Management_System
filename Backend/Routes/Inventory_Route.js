// Importing the Express library
import express from 'express';

// Importing the Inventory model 
import { Inventory } from '../Models/Inventory.js';

// Creating an Express router
const router = express.Router();

// Route for creating a new Inventory item
router.post('/', async (request, response) => {
    try {
        // Check if all required fields are present in the request body
        const requiredFields = ['Name', 'Location', 'Quantity', 'PurchasedPrice', 'SellPrice', 'SupplierName', 'SupplierPhone'];
        for (const field of requiredFields) {
            if (!request.body[field]) {
                return response.status(400).send({
                    message: `Field '${field}' is required`,
                });
            }
        }

        // Validate Supplier Phone format (must be a 10-digit number)
        const supplierPhoneRegex = /^\d{10}$/;
        if (!supplierPhoneRegex.test(request.body.SupplierPhone)) {
            return response.status(400).send({
                message: "Supplier Phone must be a 10-digit number",
            });
        }

        // Creating a new inventory item with the provided data
        const newInventory = {
            Name: request.body.Name,
            Location: request.body.Location,
            Quantity: request.body.Quantity,
            PurchasedPrice: request.body.PurchasedPrice,
            SellPrice: request.body.SellPrice,
            SupplierName: request.body.SupplierName,
            SupplierPhone: request.body.SupplierPhone,
        };

        // Adding the new inventory item to the database
        const inventory = await Inventory.create(newInventory);

        // Sending the created inventory item as a JSON response
        return response.status(201).send(inventory);
    } catch (error) {
        // Handling errors and sending an error response
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for retrieving all inventory items from the database
router.get('/', async (request, response) => {
    try {
        // Fetching all inventory items from the database
        const inventory = await Inventory.find({});
        
        // Sending the fetched inventory items as a JSON response
        response.status(200).json({
            count: inventory.length,
            data: inventory
        });
    } catch (error) {
        // Handling errors and sending an error response
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for retrieving a specific inventory item by ID
router.get('/:id', async (request, response) => {
    try {
        // Extracting the inventory item ID from the request parameters
        const { id } = request.params;

        // Fetching a menu item from the database based on the ID
        const inventory = await Inventory.findById(id);
        
        // Sending the fetched menu item as a JSON response
        response.status(200).json(inventory);
    } catch (error) {
        // Handling errors and sending an error response
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for updating a inventory item by ID
router.put('/:id', async (request, response) => {
    try {
        // Extracting the inventory item ID from the request parameters
        const { id } = request.params;
        
        // Find the inventory item by ID
        const inventory = await Inventory.findById(id);

        if (!inventory) {
            return response.status(404).send({ message: 'Inventory not found' });
        }

        // Update the fields of the inventory item
        inventory.Name = request.body.Name || inventory.Name;
        inventory.Location = request.body.Location || inventory.Location;
        inventory.Quantity = request.body.Quantity || inventory.Quantity;
        inventory.PurchasedPrice = request.body.PurchasedPrice || inventory.PurchasedPrice;
        inventory.SellPrice = request.body.SellPrice || inventory.SellPrice;
        inventory.SupplierName = request.body.SupplierName || inventory.SupplierName;
        inventory.SupplierPhone = request.body.SupplierPhone || inventory.SupplierPhone;

        // Save the updated inventory item
        await inventory.save();

        // Sending a success response
        return response.status(200).send({ message: 'Inventory updated successfully', data: inventory });

    } catch (error) {
        // Handling errors and sending an error response
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for deleting a inventory item by ID
router.delete('/:id', async(request, response) => {
    try {
        // Extracting the menu item ID from the request parameters
        const { id } = request.params;

        // Attempting to delete the menu item from the database
        await Inventory.findByIdAndDelete(id);

        // Sending a success response
        return response.status(200).send({ message: 'Menu deleted successfully' });

    } catch (error) {
        // Handling errors and sending an error response
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Exporting the Express router
export default router;
