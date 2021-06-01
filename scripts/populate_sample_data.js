const redisClient = require('../lib/redis');
const client = redisClient.getClient();
const crypto = require('crypto');
const keys = require('../daos/keys');

// Valid longitudes are from -180 to 180 degrees.
// Valid latitudes are from -85.05112878 to 85.05112878 degrees.

const generateVehicleNumber = () => {
  return crypto.randomBytes(64).toString('hex').slice(0,11).toUpperCase();
}


(async ()=> {
  const cabLocations = [];
  let long = 77.756641; // Banglore longitudes
  while(long < 78) {
    let lat = 13.076760; // Banglore latitudes
    while(lat < 14) {
      const vehicleNo = generateVehicleNumber();
      cabLocations.push(long, lat, vehicleNo);
      lat = lat + 0.001;
    }
    long = long + 0.001;
  }
  const cabsLocationKey = keys.getcabsLocationKey("IN");
  await client.geoaddAsync(cabsLocationKey, cabLocations);
  process.exit();
})()
