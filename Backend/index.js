
// Importing necessary modules
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';

// Importing custom configurations
import { PORT, mongoDBURL } from './config.js';

// Importing routes
import UserAccount_Route from './Routes/UserAccount_Route.js';
import Employee_Route from './Routes/Employee_Route.js';
import Inventory_Route from './Routes/Inventory_Route.js';
import Payment_Route from './Routes/Payment_Route.js';
import PaymentInvoice_Route from './Routes/PaymentInvoice.js';
import Vehicle_Route from './Routes/Vehicle_Route.js';
import Feedback_Route from './Routes/Feedback_Route.js';
import Booking_Route from './Routes/Booking_Route.js';
import Package_Route from './Routes/Package_Route.js';
import Service_Route from './Routes/Service_Route.js';
import ServiceHistory_Route from './Routes/ServiceHistory_Route.js';
import Manager_Route from './Routes/Manager_Route.js';
import EmployeeAttendence_Route from "./Routes/EmployeeAttendence_Route.js";
import { ReadOneHome_Route } from "./Routes/ReadOneHome_Route.js";
import EmployeeSalary_Route from './Routes/EmployeeSalary_Route.js';
import BookingLimit_Route from './Routes/BookingLimit_Route.js';

// Creating an instance of the Express application
const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
app.use(cors());

// Using routes for endpoints
app.use('/customer', UserAccount_Route);
app.use('/employees', Employee_Route);
app.use('/vehicles', Vehicle_Route);
app.use('/inventory', Inventory_Route);
app.use('/payments', Payment_Route);
app.use('/feedback', Feedback_Route);
app.use('/bookings', Booking_Route);
app.use('/Package', Package_Route);
app.use('/Service', Service_Route);
app.use('/ServiceHistory', ServiceHistory_Route);
app.use('/Manager', Manager_Route);
app.use('/EmployeeAttendence', EmployeeAttendence_Route);
app.use('/PaymentInvoice', PaymentInvoice_Route);
app.use('/Home', ReadOneHome_Route);
app.use('/EmployeeSalary', EmployeeSalary_Route);
app.use('/bookinglimits', BookingLimit_Route);

// Connecting to the MongoDB database
mongoose.connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });