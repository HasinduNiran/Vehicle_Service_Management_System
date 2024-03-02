import express from 'express';
import { PackageModel } from '../Models/Package.js';

const router = express.Router();

// Add a package
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.pakgname ||
            !request.body.pkgdescription || // Corrected field name
            !request.body.includes 
        ) {
            return response.status(400).send({
                message: 'Send all required fields: pakgname, pkgdescription, includes',
            });
        }

        const newPackage = {
            pakgname: request.body.pakgname,
            pkgdescription: request.body.pkgdescription, // Corrected field name
            includes: request.body.includes,
        };

        const createdPackage = await PackageModel.create(newPackage);

        return response.status(201).json(createdPackage);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Read all packages
router.get('/', async (request, response) => {
    try {
        const packages = await PackageModel.find({});
        response.status(200).json({
            count: packages.length,
            data: packages,
        });
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Read a package by ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const Package = await PackageModel.findById(id);

        if (!Package) {
            return response.status(404).json({ message: 'Package not found' });
        }

        response.status(200).json(Package);
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Update a package by ID
router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const updatedPackage = await PackageModel.findByIdAndUpdate(id, request.body, {
            new: true, // Return the modified document rather than the original
            runValidators: true, // Run model validation before updating
        });

        if (!updatedPackage) {
            return response.status(404).json({ message: 'Package not found' });
        }

        response.status(200).json({ message: 'Package updated successfully', data: updatedPackage });
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Delete a package by ID
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const deletedPackage = await PackageModel.findByIdAndDelete(id);

        if (!deletedPackage) {
            return response.status(404).json({ message: 'Package not found' });
        }

        response.status(200).json({ message: 'Package deleted successfully' });
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
