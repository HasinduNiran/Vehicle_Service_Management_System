// Importing the Express library
import express from 'express';
import Swal from 'sweetalert2'; // Import SweetAlert

// Importing the Inventory model 
import { Inventory } from '../Models/Inventory.js';

// Creating an Express router
const router = express.Router();

// Route for creating a new Inventory item
router.post('/', async (request, response) => {
    try {
        // Validate request body fields
        const { Name, Location, Quantity, PurchasedPrice, SellPrice, SupplierName, SupplierPhone, SupplierEmail } = request.body;

        // Check if all required fields are present and non-empty
        if (!Name || !Location || !Quantity || !PurchasedPrice || !SellPrice || !SupplierName || !SupplierPhone || !SupplierEmail) {
            return response.status(400).json({ message: 'Please provide all required fields.' });
        }

        // Validate Quantity, PurchasedPrice, and SellPrice to be numbers greater than zero
        if (isNaN(Quantity) || isNaN(PurchasedPrice) || isNaN(SellPrice) || Quantity <= 0 || PurchasedPrice <= 0 || SellPrice <= 0) {
            return response.status(400).json({ message: 'Quantity, PurchasedPrice, and SellPrice must be numbers greater than zero.' });
        }

        // Validate SupplierPhone to be a valid phone number with 10 digits
        const phoneRegex = /^\d{10}$/; // Simple regex for 10-digit phone number
        if (!phoneRegex.test(SupplierPhone)) {
            return response.status(400).json({ message: 'SupplierPhone must be a valid 10-digit phone number.' });
        }

        // Check if an inventory item with the same name already exists
        const existingItem = await Inventory.findOne({ Name });
        if (existingItem) {
            return response.status(400).json({ message: 'An inventory item with the same name already exists.' });
        }

        // Creating a new inventory item with the provided data
        const newInventory = {
            Name,
            Location,
            Quantity,
            PurchasedPrice,
            SellPrice,
            SupplierName,
            SupplierPhone,
            SupplierEmail
        };

        // Adding the new inventory item to the database
        const inventory = await Inventory.create(newInventory);

        // Sending the created inventory item as a JSON response
        return response.status(201).json(inventory);
    } catch (error) {
        // Handling errors and sending an error response
        console.error(error.message);
        response.status(500).json({ message: error.message });
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
        response.status(500).json({ message: error.message });
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
        response.status(500).json({ message: error.message });
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
            return response.status(404).json({ message: 'Inventory not found' });
        }

        // Update the fields of the inventory item
        inventory.Name = request.body.Name || inventory.Name;
        inventory.Location = request.body.Location || inventory.Location;
        inventory.Quantity = request.body.Quantity || inventory.Quantity;
        inventory.PurchasedPrice = request.body.PurchasedPrice || inventory.PurchasedPrice;
        inventory.SellPrice = request.body.SellPrice || inventory.SellPrice;
        inventory.SupplierName = request.body.SupplierName || inventory.SupplierName;
        inventory.SupplierPhone = request.body.SupplierPhone || inventory.SupplierPhone;
        inventory.SupplierEmail = request.body.SupplierEmail || inventory.SupplierEmail;

        // Save the updated inventory item
        await inventory.save();

        // Sending a success response
        return response.status(200).json({ message: 'Inventory updated successfully', data: inventory });

    } catch (error) {
        // Handling errors and sending an error response
        console.error(error.message);
        response.status(500).json({ message: error.message });
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
        return response.status(200).json({ message: 'Menu deleted successfully' });

    } catch (error) {
        // Handling errors and sending an error response
        console.log(error.message);
        response.status(500).json({ message: error.message });
    }
});

// Exporting the Express router
export default router;
