// Importing the required libraries and models
import express from "express"; // Using Express for routing
import { Feedback } from "../Models/Feedback.js"; // Importing the Feedback model

// Creating an Express router
const router = express.Router();

// Middleware to validate required fields before creating new feedback
const validateFields = (req, res, next) => {
  const requiredFields = [
    "name",
    "email",
    "phone_number",
    "employee",
    "date_of_service",
    "message",
  ];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).send({ message: `Missing field: ${field}` });
    }
  }
  next();
};

// POST route to create new feedback
router.post("/", validateFields, async (req, res) => {
  try {
    const newFeedback = req.body;
    const feedback = await Feedback.create(newFeedback);
    res.status(201).send(feedback);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

// GET route for retrieving feedback based on search criteria, pagination, and sorting
router.get("/feedback", async (req, res) => {
  try {
    const { page = 1, limit = 5, search = "", sort = "name" } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone_number: { $regex: search, $options: "i" } },
        { employee: { $regex: search, $options: "i" } },
        { date_of_service: { $regex: search, $options: "i" } },
      ],
    };
    const feedback = await Feedback.find(query)
      .sort({ [sort]: 1 })
      .skip(skip)
      .limit(parseInt(limit));
    res.status(200).json({ count: feedback.length, data: feedback });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// GET route to fetch all feedback records
router.get("/", async (request, response) => {
  try {
    const feedback = await Feedback.find({});
    response.status(200).json({ count: feedback.length, data: feedback });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});

// GET route to fetch a specific feedback item by ID
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const feedback = await Feedback.findById(id);
    
    if (!feedback) {
      return response.status(404).send({ message: "Feedback not found" });
    }
    
    response.status(200).json(feedback);
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});

// PUT route to update a feedback item by ID
router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    
    if (
      !request.body.name ||
      !request.body.email ||
      !request.body.phone_number ||
      !request.body.employee ||
      !request.body.date_of_service ||
      !request.body.message
    ) {
      return response.status(400).send({ message: "Send all required fields" });
    }
    
    await Feedback.findByIdAndUpdate(id, request.body);
    
    response.status(200).send({ message: "Feedback updated successfully" });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});

// DELETE route to remove a feedback item by ID
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    await Feedback.findByIdAndDelete(id);
    response.status(200).send({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Exporting the Express router for use in other files
export default router;
