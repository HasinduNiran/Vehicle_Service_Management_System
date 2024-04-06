//Route for save a new reservation

import  express from 'express';
import {createVehicle} from '../Models/Booking.js';

const router = express.Router();


router.post('/',async (request, response) => {
   try{
      if(
    !request.body.Customer_Name ||
    !request.body.Vehicle_Type || 
    !request.body.Vehicle_Number||
    !request.body.Contact_Number ||
    !request.body.Email
      ){
    return response.status(400).send({
      message: 'Send all required field'
    });
      }
    const newVehicle = {
    Booking_Date: request.body.Booking_Date,
    Customer_Name: request.body.Customer_Name,
    Vehicle_Type: request.body.Vehicle_Type,
    Vehicle_Number: request.body.Vehicle_Number,
    Contact_Number: request.body.Contact_Number,
    Email: request.body.Email

    };
    
    const vehicle = await createVehicle.create(newVehicle);
    return response.status(201).send(vehicle);
    
      
    }catch(error){
    
    console.log(error.message);
    response.status(500).send({message: error.message});
    
    }
    
    });

    //get all booking details
    router.get('/',async (request, response) => {
      try {
        const bookings = await createVehicle.find({});

        return response.status(200).json(bookings);
      }catch(error){

     console.log(error.message);
     response.status(500).send({message: error.message});

      }

    });

    router.get('/:id',async (request, response) => {
      try {

        const {id} = request.params;
        const vehicle = await createVehicle.findById(id);

        return response.status(200).json(vehicle);
      }catch(error){

     console.log(error.message);
     response.status(500).send({message: error.message});

      }

    });

    //Route for update booking
    router.put('/:id',async (request, response) => {
      try{
      if(
     !request.body.Customer_Name ||
     !request.body.Vehicle_Type || 
     !request.body.Vehicle_Number||
     !request.body.Contact_Number ||
     !request.body.Email
      ){
    return response.status(400).send({
      message: 'Send all required field'
    });
      }
    
      const {id} = request.params;

      const result = await createVehicle.findByIdAndUpdate(id, request.body); 
     if (!result){
      return response.status(404).json({ message: 'book not found'});
     }
     return response.status(200).send({ message: 'book updated successfully' });
      }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
      }
    });
    
    //Route for delete booking

    router.delete('/:id',async (request, response) => {
      try{
      const {id} = request.params;
      const result = await createVehicle.findByIdAndDelete(id);
      if (!result){
      return response.status(404).json({ message: 'book not found'});
      }
     return response.status(200).send({ message: 'book deleted successfully' });
    }catch(error){
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  router.get("searchbooking", function (req, res) {
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
});






    export default router;


    