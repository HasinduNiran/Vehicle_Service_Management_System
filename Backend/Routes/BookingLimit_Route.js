import  express from 'express';
import mongoose from 'mongoose';

import {addLimit} from '../Models/BookingLimit.js';

const router = express.Router();


router.post('/',async (request, response) => {
   try{
      if(
    !request.body.Booking_Date ||
    !request.body.Booking_Limit
      ){
    return response.status(400).send({
      message: 'Send all required field'
    });
      }
    const newLimit = {
    Booking_Date: request.body.Booking_Date,
    Booking_Limit: request.body.Booking_Limit
    };
    
    const vehicle = await addLimit.create(newLimit);
    return response.status(201).send(vehicle);
    
      
    }catch(error){
    
    console.log(error.message);
    response.status(500).send({message: error.message});
    
    }
    
    });

    //get all booking details
    router.get('/',async (request, response) => {
      try {
        const bookinglimits = await addLimit.find({});

        return response.status(200).json(bookinglimits);
      }catch(error){

     console.log(error.message);
     response.status(500).send({message: error.message});

      }

    });

    // router.get('/:id',async (request, response) => {
    //   try {

    //     const {id} = request.params;
    //     const vehicle = await createVehicle.findById(id);

    //     return response.status(200).json(vehicle);
    //   }catch(error){

    //  console.log(error.message);
    //  response.status(500).send({message: error.message});

    //   }

    // });

//
// GETS route to retrieve a booking limit by ID or Booking_Date
     router.get('/:identifier', async (req, res) => {
    try {
        const { identifier } = req.params;

        // Check if the identifier is a valid MongoDB ObjectId
        if (mongoose.Types.ObjectId.isValid(identifier)) {
            const bookingLimitByID = await addLimit.findById(identifier);
            if (bookingLimitByID) {
                return res.status(200).json(bookingLimitByID);
            }
        }

        // If the identifier is not a valid ObjectId, try searching by Booking_Date
        const bookingLimitByDate = await addLimit.findOne({ Booking_Date: identifier });
        if (bookingLimitByDate) {
            return res.status(200).json(bookingLimitByDate);
        }

        return res.status(404).json({ message: 'Booking limit not found.' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});
    //Route for update booking limit
    router.put('/:id',async (request, response) => {
      try{
      if(
     !request.body.Booking_Date ||
     !request.body.Booking_Limit
      ){
    return response.status(400).send({
      message: 'Send all required field'
    });
      }
    
      const {id} = request.params;

      const result = await addLimit.findByIdAndUpdate(id, request.body); 
     if (!result){
      return response.status(404).json({ message: 'book limit not found'});
     }
     return response.status(200).send({ message: 'booking limit updated successfully' });
      }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
      }
    });
    
    //Route for delete booking limit

    router.delete('/:id',async (request, response) => {
      try{
      const {id} = request.params;
      const result = await addLimit.findByIdAndDelete(id);
      if (!result){
      return response.status(404).json({ message: 'booking limit not found'});
      }
     return response.status(200).send({ message: 'booking limit deleted successfully' });
    }catch(error){
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
/*
  router.get("/searchbooking", function (req, res) {
    var search = req.query.search;
    console.log(search);
    Booking.find({
        $or: [
            { Customer_Name: { $regex: search, $options: "i" } },
            { Vehicle_Number: { $regex: search, $options: "i" } },
            { Email: { $regex: search, $options: "i" } }
        ]
    }, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(result);
        }
    });
});  */






    export default router;