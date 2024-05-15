// packageRoutes.js
import express from 'express';
import { PackageModel } from '../Models/Package.js';

const router = express.Router();

// Add a package
router.post('/', async (req, res) => {
    try {
        const { pakgname, pkgdescription, includes, Price, exp } = req.body;

        // Validate required fields
        if (!pakgname || !pkgdescription || !includes || !Price || !exp) {
            return res.status(400).json({ message: 'All required fields must be provided: pakgname, pkgdescription, includes, Price, exp' });
        }

        const newPackage = await PackageModel.create({ pakgname, pkgdescription, includes, Price, exp });
        return res.status(201).json(newPackage);
    } catch (error) {
        console.error('Error adding package:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Read all packages
router.get('/', async (req, res) => {
    try {
        const packages = await PackageModel.find({});
        return res.status(200).json({ count: packages.length, data: packages });
    } catch (error) {
        console.error('Error fetching packages:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Read a package by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const foundPackage = await PackageModel.findById(id);

        if (!foundPackage) {
            return res.status(404).json({ message: 'Package not found' });
        }
        return res.status(200).json(foundPackage);
    } catch (error) {
        console.error('Error fetching package by ID:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Update a package by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPackage = await PackageModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedPackage) {
            return res.status(404).json({ message: 'Package not found' });
        }

        return res.status(200).json({ message: 'Package updated successfully', data: updatedPackage });
    } catch (error) {
        console.error('Error updating package by ID:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Delete a package by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPackage = await PackageModel.findByIdAndDelete(id);

        if (!deletedPackage) {
            return res.status(404).json({ message: 'Package not found' });
        }

        return res.status(200).json({ message: 'Package deleted successfully' });
    } catch (error) {
        console.error('Error deleting package by ID:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Search for a package
router.get("/searchpackage", async (req, res) => {
    try {
        const search = req.query.search;
        const result = await PackageModel.find({
            $or: [
                { pakgname: { $regex: new RegExp(search, "i") } },
                { pkgdescription: { $regex: new RegExp(search, "i") } },
                { includes: { $regex: new RegExp(search, "i") } },
                { Price: { $regex: new RegExp(search, "i") } },
                { exp: { $regex: new RegExp(search, "i") } }
            ]
        });

        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message:
"Internal server error" });
}
});

export default router;