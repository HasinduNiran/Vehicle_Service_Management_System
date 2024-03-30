import express from "express";
import { Feedback } from "../Models/Feedback.js";
import React, { useEffect } from 'react';

const router = express.Router();

const validateFields = (req, res, next) => {
  const requiredFields = [
    "name",
    "email",
    "phone_number",
    "employee",
    "date_of_service",
    "message",
    "star_rating",
  ];
  
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).send({ message: `Field '${field}' cannot be empty` });
    }
  }

  if (!req.body.email.match(/^\S+@\S+\.\S+$/)) {
    return res.status(400).send({ message: "Please provide a valid email address" });
  }

  if (!req.body.phone_number.match(/^\d{10}$/)) {
    return res.status(400).send({ message: "Please provide a valid 10-digit phone number" });
  }

  next(); // Call next to proceed to the next middleware or route handler
};

router.post("/", validateFields, async (req, res) => {
  try {
    const {
      name,
      email,
      phone_number,
      employee,
      date_of_service,
      message,
      star_rating,
    } = req.body;

    const parsedDate = new Date(date_of_service); // Parse date_of_service to a Date object

    const newFeedback = {
      name,
      email,
      phone_number,
      employee,
      date_of_service: parsedDate,
      message,
      star_rating,
    };

    const feedback = await Feedback.create(newFeedback);
    res.status(201).send(feedback);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});


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
        { star_rating: { $regex: search, $options: "i"} },
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
const handleSaveFeedback = async () => {
  // Check email and phone number format
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  if (!phoneRegex.test(phoneNumber)) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }

  // Check if all fields are filled
  if (!name || !email || !phoneNumber || !employee || !message) {
    alert("Please fill in all fields before submitting.");
    return;
  }

  // Format date_of_service
  const formattedDate = formatDate(dateOfService);

  const data = {
    name,
    email,
    phone_number: phoneNumber,
    employee,
    date_of_service: formattedDate,
    message,
  };

  setLoading(true);

  try {
    // Send POST request
    await axios.post("http://localhost:8076/feedback", data);
    setLoading(false);
    navigate("/feedback");
  } catch (error) {
    setLoading(false);
    console.error("Error creating feedback:", error);
    alert(
      "An error occurred while creating feedback. Please try again later."
    );
  }
};

router.get("/", async (req, res) => {
  try {
    const feedback = await Feedback.find({});
    res.status(200).json({ count: feedback.length, data: feedback });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

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

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findById(id);
    
    if (!feedback) {
      return res.status(404).send({ message: "Feedback not found" });
    }

    await Feedback.findByIdAndUpdate(id, req.body);
    
    res.status(200).send({ message: "Feedback updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findById(id);
    
    if (!feedback) {
      return res.status(404).send({ message: "Feedback not found" });
    }
    
    await Feedback.findByIdAndDelete(id);
    res.status(200).send({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});


export default router;
