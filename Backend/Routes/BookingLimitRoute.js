
import express from 'express';
//import mongoose from 'mongoose';


import { setLimit } from '../Models/BookingLimit.js';

const router = express.Router();













router.post('/', async (request, response) => {


try{

  if (
   !request.body.BookingLimit
  ) {
    return response.status(400).send({ error: 'BookingLimit is required' });
  }



    const newLimit = {
  
      BookingLimit : request.body.BookingLimit
    };
  
    const bookingLimit = await setLimit.create(newLimit);
      return response.status(201).send(bookingLimit);
  

    } catch (error) {


      console.error(error); // Changed from console.log to console.error for better indication of error
      return response.status(500).send({ error: 'Internal Server Error' });
  
    }


  });










  export default router;