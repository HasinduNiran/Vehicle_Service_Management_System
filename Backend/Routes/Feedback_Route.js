import express from "express";
import Feedback from "../Models/Feedback.js"; // Changed import statement

const router = express.Router();

// Middleware to validate fields in the request body
const validateFields = (req, res, next) => {
  const requiredFields = [
    "CustomerID",
    "name",
    "email",
    "phone_number",
    "employee",
    "date_of_service",
    "message",
    "star_rating",
  ];

  // Check if all required fields are present
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res
        .status(400)
        .send({ message: `Field '${field}' cannot be empty` });
    }
  }

  // Validate email format
  if (!req.body.email.match(/^\S+@\S+\.\S+$/)) {
    return res
      .status(400)
      .send({ message: "Please provide a valid email address" });
  }

  // Validate phone number format
  if (!req.body.phone_number.match(/^\d{10}$/)) {
    return res
      .status(400)
      .send({ message: "Please provide a valid 10-digit phone number" });
  }

  // Parse date_of_service to a Date object
  const parsedDate = req.body.date_of_service ? new Date(req.body.date_of_service) : undefined;
  if (!parsedDate || isNaN(parsedDate.getTime())) {
    return res.status(400).send({ message: "Please provide a valid date for date_of_service" });
  }

  req.parsedDate = parsedDate; // Make parsed date available in request object
  next();
};

// Create new feedback
router.post("/", validateFields, async (req, res) => {
  try {
    const {
      CustomerID,
      name,
      email,
      phone_number,
      employee,
      message,
      star_rating,
    } = req.body;

    const newFeedback = {
      CustomerID,
      name,
      email,
      phone_number,
      employee,
      date_of_service: req.parsedDate,
      message,
      star_rating,
    };

    // Save new feedback to the database
    const feedback = await Feedback.create(newFeedback);
    if (!feedback) {
      return res.status(500).send({ message: "Failed to create feedback" });
    }
    res.status(201).send(feedback);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Get names of all employees
router.get("/employees/names", async (req, res) => {
  try {
    const employees = await Feedback.find({}, "employee");
    res.status(200).json({ count: employees.length, data: employees });
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
        { CustomerID:{$regex: search,$options: "i"}},
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone_number: { $regex: search, $options: "i" } },
        { employee: { $regex: search, $options: "i" } },
        { date_of_service: { $regex: search, $options: "i" } },
        { star_rating: { $regex: search, $options: "i" } },
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

// Get all feedback
router.get("/", async (req, res) => {
  try {
    const feedback = await Feedback.find({});
    res.status(200).json({ count: feedback.length, data: feedback });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Get feedback by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findById(id);

    if (!feedback) {
      return res.status(404).send({ message: "Feedback not found" });
    }

    res.status(200).json(feedback);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Update feedback by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findById(id);

    if (!feedback) {
      return res.status(404).send({ message: "Feedback not found" });
    }

    // Update feedback
    await Feedback.findByIdAndUpdate(id, req.body);

    res.status(200).send({ message: "Feedback updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Delete feedback by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findById(id);

    if (!feedback) {
      return res.status(404).send({ message: "Feedback not found" });
    }

    // Delete feedback
    await Feedback.findByIdAndDelete(id);
    res.status(200).send({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router; // Changed export statement
