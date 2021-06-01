const keys = require('./keys');
const redisClient = require('../lib/redis');
const client = redisClient.getClient();

module.exports = {

  // store the geospatial indexes of cabs grouped by country, to scale it out we need to group it according to city.
  // and schema would follow something like '${PREFIX}:availablecabs:${countryCode}:${city}'
  updateCabLocation: async(vehicleNo, long, lat, countryCode) => {
    const cabsLocationKey = keys.getcabsLocationKey(countryCode);
    const result = await client.geoaddAsync(cabsLocationKey, long, lat, vehicleNo);
  },

  // search cabs in specified radius
  searchCabs: async (long, lat, radius, unit, count, countryCode) => {
    countryCode = countryCode || "IN";
    count = count || 10;
    const cabsLocationKey = keys.getcabsLocationKey(countryCode);
    let cabsLocation = await client.geosearchAsync(cabsLocationKey, 'FROMLONLAT', long, lat, 'BYRADIUS', radius, unit, 'WITHCOORD', 'COUNT', count, 'ASC');
    return cabsLocation.map((cabLocation) => { return {vehicleNo: cabLocation[0], coordinates: cabLocation[1]}});
  }

}
