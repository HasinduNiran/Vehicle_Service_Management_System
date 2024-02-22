//Route for save a new reservation

import  express from 'express';
import {createVehicle} from './Models/Booking.js';

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
    Customer_Name: request.body.Customer_Name,
    Vehicle_Type: request.body.Vehicle_Type,
    Vehicle_Number: request.body.Vehicle_Number,
    Contact_Number: request.body.Contact_Number,
    Email: request.body.Email

    }
    
    const vehicle = await createVehicle(newVehicle);
    return response.status(201).send(vehicle);
    
      
    }catch(error){
    
    console.log(error.message);
    response.status(500).send({message: error.message});
    
    }
    
    });


    export default router;


    