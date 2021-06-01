const bookings = require('../daos/bookings');
const express = require('express');
const router = express.Router();


// create a booking
router.post(
  '/create',
  async(req, res, next) => {
    let {userId, coordinates } = req.body;
    const booking = await bookings.create(userId, coordinates);
    res.send(booking);
  }
);


module.exports = router;
