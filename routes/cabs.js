const cabsLocation = require('../daos/cabs_location');
const express = require('express');
const router = express.Router();


// Add or update the location of a cab
router.post(
  '/updatelocation',
  async(req, res, next) => {
    const {long, lat, vehicleNo, countryCode} = req.body;
    const results = await cabsLocation.updateCabLocation(vehicleNo, long, lat, countryCode);
    res.send({message: 'successfully updated cab location'});
  }
);


// search cabs within a specified radius
router.post(
  '/search',
  async(req, res, next) => {
    let {long, lat, radius, unit} = req.body;
    radius = radius || 1;
    unit = unit || 'km';
    const availableCabs = await cabsLocation.searchCabs(long, lat, radius, unit);
    res.send(availableCabs);
  }
);


module.exports = router;
