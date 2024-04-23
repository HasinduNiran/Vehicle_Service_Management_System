import express from 'express';
import mongoose from 'mongoose';

import { Payment } from '../Models/Payment.js';

const router = express.Router();

// Route for new payment
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.PaymentId ||
      !request.body.cusID||
      !request.body.Vehicle_Number||
      !request.body.PaymentDate ||
      !request.body.totalAmount ||
      !request.body.PaymentMethod||
      !request.body.Booking_Id||
      !request.body.Package||
      !request.body.selectedServices||
      !request.body.Pamount||
      !request.body.email||
      !request.body.Samount
    ) {
      return response.status(400).send({
        message: 'Send all required fields:PaymentId,Package,cusID,PaymentDate,totalAmount,PaymentMethod',
      });
    }
    const newPayment = {
      PaymentId: request.body.PaymentId,
      cusID:request.body.cusID,
      Vehicle_Number: request.body.Vehicle_Number,
      PaymentDate: request.body.PaymentDate,
      totalAmount: request.body.totalAmount,
      PaymentMethod: request.body.PaymentMethod,
      Booking_Id: request.body.Booking_Id,
      Pamount: request.body.Pamount,
      email: request.body.email,
      Samount: request.body.Samount,
      Package: request.body.Package,
      selectedServices: request.body.selectedServices,
    };
    const payment = await Payment.create(newPayment);
    return response.status(201).send(payment);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// GET route for retrieving payments based on search criteria, pagination, and sorting
router.get("/payments", async (req, res) => {
  try {
    // Destructuring the request query with default values
    const { page = 1, limit = 4, search = "", sort = "PaymentId" } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    // Regular expression for case-insensitive search
    const query = {
      $or: [
        { PaymentId: { $regex: new RegExp(search, 'i') } }, // Using RegExp instead of directly passing $regex
        { PaymentDate: { $regex: new RegExp(search, 'i') } },
        { totalAmount: { $regex: new RegExp(search, 'i') } },
        { PaymentMethod: { $regex: new RegExp(search, 'i') } },
      ],
    };
    // Using await to ensure that sorting and pagination are applied correctly
    const payments = await Payment.find(query)
      .sort({ [sort]: 1 }) // Sorting based on the specified field
      .skip(skip)
      .limit(parseInt(limit));
    res.status(200).json({ count: payments.length, data: payments });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});


// Route for all the payments
router.get('/', async (request, response) => {
  try {
    const payments = await Payment.find({});
    return response.status(200).json({
      count: payments.length,
      data: payments
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for get 1 payment
/*router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const payment = await Payment.findById(id);
    return response.status(200).json(payment)
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});*/

 // Route for retrieving a specific Vehicle by ID
 router.get('/:identifier', async (request, response) => {
  try {
      // Extracting the identifier from the request parameters
      const { identifier } = request.params;

      // Checking if the provided identifier is a valid MongoDB ObjectId
      if (mongoose.Types.ObjectId.isValid(identifier)) {
          // Fetching a vehicle from the database based on the ID
          const PaymentByID = await Payment.findById(identifier);
          if (PaymentByID) {
              // Sending the fetched vehicle as a JSON response if found by ID
              return response.status(200).json(PaymentByID);
          }
      }

      // If the provided identifier is not a valid ObjectId, try searching by register number
      const PaymentByCUSID = await Payment.find({ cusID: identifier });
      if (PaymentByCUSID) {
          // Sending the fetched vehicle as a JSON response if found by register number
          return response.status(200).json(PaymentByCUSID);
      }

      // If no vehicle found by either ID or register number, send a 404 Not Found response
      return response.status(404).json({ message: 'payment not found' });
  } catch (error) {
      // Handling errors and sending an error response with detailed error message
      console.error(error);
      response.status(500).send({ message: 'Error fetching booking: ' + error.message });
  }
});



// Route for update
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.PaymentId ||
      !request.body.cusID||
      !request.body.Vehicle_Number||
      !request.body.PaymentDate ||
      !request.body.totalAmount ||
      !request.body.PaymentMethod||
      !request.body.Booking_Id||
      !request.body.Package||
      !request.body.selectedServices||
      !request.body.Pamount||
      !request.body.email||
      !request.body.Samount
    ) {
      return response.status(400).send({
        message: 'Send all required fields:PaymentId,cusID,PaymentDate,totalAmount,PaymentMethod',
      });
    }
    const { id } = request.params;
    const result = await Payment.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({ message: 'Payment not found' });
    }
    return response.status(200).send(result);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for delete
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Payment.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: 'Payment not found' });
    }
    return response.status(200).send({ message: "Payment deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
