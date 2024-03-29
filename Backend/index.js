// Importing necessary modules
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';

// Importing custom configurations
import { PORT, mongoDBURL } from './config.js';


// Importing model and routes


import UserAccount_Route from './Routes/UserAccount_Route.js';
import Employee_Route from './Routes/Employee_Route.js';
import Inventory_Route from './Routes/Inventory_Route.js';
import Payment_Route from './Routes/Payment_Route.js';
import Vehicle_Route from './Routes/Vehicle_Route.js';
import Feedback_Route from './Routes/Feedback_Route.js';
import Booking_Route from './Routes/Booking_Route.js';
import Package_Route from './Routes/Package_Route.js';
import ServiceHistory_Route from './Routes/ServiceHistory_Route.js';
import Manager_Route from './Routes/Manager_Route.js';


// Creating an instance of the Express application
const app = express();


// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

// app.get('/', (request, response) => {
//   console.log(request);
//   return response.status(234).send('Welcome To MERN Stack Tutorial');
// });


// Using  routes for endpoint





// app.get('/',(request,response)=>{
//    console.log(request);
//    return response.status(234).send('Welcome')
// });



app.use('/customer', UserAccount_Route);
app.use('/employees',Employee_Route);
app.use('/vehicles', Vehicle_Route);
app.use('/inventory', Inventory_Route);
app.use('/payments',Payment_Route);
app.use('/feedback', Feedback_Route);
app.use('/bookings',Booking_Route);
app.use('/Package',Package_Route);

app.use('/ServiceHistory',ServiceHistory_Route);
app.use('/Manager',Manager_Route);



// Connecting to the MongoDB database

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });