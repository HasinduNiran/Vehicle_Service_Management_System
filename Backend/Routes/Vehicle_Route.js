const router = require("express").Router();
const vehicle = require("../Models/Vehicle");

// Route to add a new vehicle
router.post("/addvehicle", (req, res) => {
    const { Register_Number, Model, Owner } = req.body;

    const newVehicle = new vehicle({ Register_Number, Model, Owner });

    newVehicle.save()
        .then(() => {
            res.send("Vehicle Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Server Error");
        });
});

// Route to get all vehicles
router.get("/", (req, res) => {
    vehicle.find()
        .then((vehicles) => {
            res.json(vehicles);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Server Error");
        });
});

// Route to update a vehicle by ID
router.put("/update/:id", async (req, res) => {
    const vehicleId = req.params.id;
    const { Register_Number, Model, Owner } = req.body;

    const updateVehicle = {
        Register_Number,
        Model,
        Owner
    };

    try {
        const updatedVehicle = await vehicle.findByIdAndUpdate(vehicleId, updateVehicle, { new: true });
        res.json(updatedVehicle);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

// Route to delete a vehicle by ID
router.delete("/delete/:id", async (req, res) => {
    const vehicleId = req.params.id;
    try {
        await vehicle.findByIdAndDelete(vehicleId);
        res.send("Vehicle Deleted");
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

// Route to get a vehicle by ID
router.get("/get/:id", async (req, res) => {
    const vehicleId = req.params.id;
    try {
        const foundVehicle = await vehicle.findById(vehicleId);
        res.json(foundVehicle);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
