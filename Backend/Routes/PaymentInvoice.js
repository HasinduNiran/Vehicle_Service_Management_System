import express from 'express';
import {PaymentInvoice} from '../Models/PaymentInvoice.js';

const router = express.Router();

//Route for new Invoice
router.post('/', async (request, response) => {
    try {
      if (
       
        !request.body.cusID||
        !request.body.PaymentId ||
        !request.body.Vehicle_Number ||
        !request.body.PaymentDate ||
        !request.body.totalAmount||
        !request.body.Booking_Id
      ) {
        return response.status(400).send({
          message: 'Send all required fields:InvoiceId,customerName,PaymentId,Vehicle_Number,Pamount,Samount,Vehicle_Color,Model,Year,Engine_Details,PaymentDate,totalAmount,Booking_Id',
        });
      }
      
      const newPaymentInvoice = {
        InvoiceId: request.body.InvoiceId,
        customerName:request.body.customerName,
        cusID:request.body.cusID,
        PaymentId: request.body.PaymentId,
        Vehicle_Number: request.body.Vehicle_Number,
        Vehicle_Color: request.body.Vehicle_Color,
        Model: request.body.Model,
        Year: request.body.Year,
        Engine_Details: request.body.Engine_Details,
        PaymentDate: request.body.PaymentDate,
        totalAmount: request.body.Pamount,
        Package: request.body.Package,
        selectedServices: request.body.selectedServices,
        Pamount: request.body.Pamount,
        Samount: request.body.Samount,
        Booking_Id: request.body.Booking_Id,
        email: request.body.email,
      };
      const paymentinvoice = await PaymentInvoice.create(newPaymentInvoice);
      return response.status(201).send(paymentinvoice);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  
// Route for all the invoices
router.get('/', async (request, response) => {
    try {
      const paymentinvoices = await PaymentInvoice.find({});
      return response.status(200).json({
        count: paymentinvoices.length,
        data: paymentinvoices
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  // Route for get 1 paymentinvoice
  router.get('/:id', async (request, response) => {
    try {
      const { id } = request.params;
      const paymentinvoice = await PaymentInvoice.findById(id);
      return response.status(200).json(paymentinvoice)
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  
  
  // Route for update
  router.put('/:id', async (request, response) => {
    try {
      if (
        
        
        !request.body.cusID||
        !request.body.PaymentId||
        !request.body.Vehicle_Number ||
        !request.body.PaymentDate||
        !request.body.totalAmount||
        !request.body.Booking_Id
      ) {
        return response.status(400).send({
          message:'Send all required fields:InvoiceId,customerName,PaymentId,Vehicle_Number,Vehicle_Color,Model,Year,Engine_Details,PaymentDate,totalAmount,Booking_Id',
        });
      }
      const { id } = request.params;
      const result = await PaymentInvoice.findByIdAndUpdate(id, request.body);
      if (!result) {
        return response.status(404).json({ message: 'PaymentInvoice not found' });
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
      const result = await PaymentInvoice.findByIdAndDelete(id);
      if (!result) {
        return response.status(404).json({ message: 'PaymentInvoice not found' });
      }
      return response.status(200).send({ message: "PaymentInvoice deleted successfully" });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  export default router;
  