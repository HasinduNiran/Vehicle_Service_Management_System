import express from 'express';
import { Manager } from '../Models/Manager.js';

const router = express.Router();

// Route for Save a new Manager
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.Musername ||
      !request.body.Mpassword

    ) {
      return response.status(400).send({
        message: 'Send all required fields: musername, mpassword',
      });
    }
    const newManager = {
      Musername: request.body.Musername,
      Mpassword: request.body.Mpassword,
    };

    const manager = await Manager.create(newManager);

    return response.status(201).send(manager);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All managers from database
router.get('/', async (request, response) => {
    try {
      const manager = await Manager.find({});
  
      return response.status(200).json({
        count: manager.length,
        data: manager,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

export default router;