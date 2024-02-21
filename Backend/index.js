import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
//import bookRoutes from './routes/bookRoutes.js';
import Employee_Route from './Routes/Employee_Route.js';
import Inventory_Route from './Routes/Inventory_Route.js';
import Payment_Route from './Routes/Payment_Route.js';
import cors from 'cors';

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

//app.use('/books', bookRoutes);
app.use('/employees',Employee_Route);
app.use('/inventory', Inventory_Route);
app.use('/payments',Payment_Route);

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