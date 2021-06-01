const PREFIX = 'cab-service';

module.exports = {

  // store geospatial index of all cabs in a given country, idealy classification should be based on cities, operation operates in o(log(n))
  getcabsLocationKey: (countryCode) => {
    countryCode = countryCode || "IN";
    return `${PREFIX}:availablecabs:${countryCode}`
  },

  // key used for store cab details
  getCabsKey: (vehicleNo) => {
    return `${PREFIX}:cabs:${vehicleNo}`;
  },

  // key used for store bookings
  getBookingKey: (userId, bookingId) => {
    return `${PREFIX}:bookings:user:${userId}:booking:${bookingId}`;
  },

}
