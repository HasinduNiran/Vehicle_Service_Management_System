//Route for save a new reservation

import express from 'express';
import mongoose from 'mongoose';

import { createVehicle } from '../Models/Booking.js';

const router = express.Router();


router.post('/', async (request, response) => {



  try {

    if (!request.body.DAILY_BOOKING_LIMIT || isNaN(request.body.DAILY_BOOKING_LIMIT)) {
      return response.status(400).send({
        message: 'DAILY_BOOKING_LIMIT must be provided and must be a number.'
      });
    }

    
    const DAILY_BOOKING_LIMIT = parseInt(request.body.DAILY_BOOKING_LIMIT);


    if (
      !request.body.Customer_Name ||
      !request.body.Vehicle_Type ||
      !request.body.Vehicle_Number ||
      !request.body.Contact_Number ||
      !request.body.Email
    ) {
      return response.status(400).send({
        message: 'Send all required field'
      });
    }



    // Assuming Booking_Date is in YYYY-MM-DD format
    const bookingDate = new Date(request.body.Booking_Date);
    bookingDate.setHours(0, 0, 0, 0); // Set time to 00:00:00 to compare dates only

    const nextDay = new Date(bookingDate);
    nextDay.setDate(bookingDate.getDate() + 1); // Get next day for the query

    // Count bookings for the requested day
    const count = await createVehicle.countDocuments({
      Booking_Date: {
        $gte: bookingDate,
        $lt: nextDay
      }
    });

    // Check if the limit is reached
    if (count >= DAILY_BOOKING_LIMIT) {
      return response.status(400).send({
        message: 'Daily booking limit reached. Please choose another day.'
      });
    }


    const newVehicle = {
      cusID: request.body.cusID,
      Booking_Date: request.body.Booking_Date,
      Customer_Name: request.body.Customer_Name,
      Vehicle_Type: request.body.Vehicle_Type,
      Vehicle_Number: request.body.Vehicle_Number,
      Contact_Number: request.body.Contact_Number,
      Email: request.body.Email,
      selectedPackage: request.body.selectedPackage,
      selectedServices: request.body.selectedServices
    };

    const vehicle = await createVehicle.create(newVehicle);
    return response.status(201).send(vehicle);


  } catch (error) {

    console.log(error.message);
    response.status(500).send({ message: error.message });

  }

});




//get all booking details
router.get('/', async (request, response) => {
  try {
    const bookings = await createVehicle.find({});

    return response.status(200).json(bookings);
  } catch (error) {

    console.log(error.message);
    response.status(500).send({ message: error.message });

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

// Route for retrieving a specific Vehicle by ID
router.get('/:identifier', async (request, response) => {
  try {
    // Extracting the identifier from the request parameters
    const { identifier } = request.params;

    // Checking if the provided identifier is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      // Fetching a vehicle from the database based on the ID
      const BookingByID = await createVehicle.findById(identifier);
      if (BookingByID) {
        // Sending the fetched vehicle as a JSON response if found by ID
        return response.status(200).json(BookingByID);
      }
    }

    // If the provided identifier is not a valid ObjectId, try searching by register number
    const BookingByCUSID = await createVehicle.find({ cusID: identifier });
    if (BookingByCUSID) {
      // Sending the fetched vehicle as a JSON response if found by register number
      return response.status(200).json(BookingByCUSID);
    }

    // If no vehicle found by either ID or register number, send a 404 Not Found response
    return response.status(404).json({ message: 'booking not found' });
  } catch (error) {
    // Handling errors and sending an error response with detailed error message
    console.error(error);
    response.status(500).send({ message: 'Error fetching booking: ' + error.message });
  }
});


//Route for update booking
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.Customer_Name ||
      !request.body.Vehicle_Type ||
      !request.body.Vehicle_Number ||
      !request.body.Contact_Number ||
      !request.body.Email
    ) {
      return response.status(400).send({
        message: 'Send all required field'
      });
    }

    const { id } = request.params;

    const result = await createVehicle.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({ message: 'book not found' });
    }
    return response.status(200).send({ message: 'book updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for delete booking

router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await createVehicle.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: 'book not found' });
    }
    return response.status(200).send({ message: 'book deleted successfully' });
  } catch (error) {
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


