import express from 'express';
import { Payment } from '../Models/Payment.js';

const router = express.Router();

// Route for new payment
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.PaymentId ||
      !request.body.cusID||
      !request.body.PaymentDate ||
      !request.body.totalAmount ||
      !request.body.PaymentMethod
    ) {
      return response.status(400).send({
        message: 'Send all required fields:PaymentId,PaymentDate,totalAmount,PaymentMethod',
      });
    }
    const newPayment = {
      PaymentId: request.body.PaymentId,
      cusID:request.body.cusID,
      PaymentDate: request.body.PaymentDate,
      totalAmount: request.body.totalAmount,
      PaymentMethod: request.body.PaymentMethod,
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
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const payment = await Payment.findById(id);
    return response.status(200).json(payment)
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for update
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.PaymentId ||
      !request.body.cusID||
      !request.body.PaymentDate ||
      !request.body.totalAmount ||
      !request.body.PaymentMethod
    ) {
      return response.status(400).send({
        message: 'Send all required fields:PaymentId,PaymentDate,totalAmount,PaymentMethod',
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
