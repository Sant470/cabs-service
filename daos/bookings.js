const keys = require('./keys');
const redisClient = require('../lib/redis');
const client = redisClient.getClient();
const crypto = require('crypto');


module.exports = {

  create: async(userId, coordinates) => {
    const id = crypto.randomBytes(64).toString('hex').slice(0,15).toUpperCase();
    const bookingKey = keys.getBookingKey(userId, id);
    const booking = {
      'id': id,
      'userId': userId,
      'location:long': coordinates[0],
      'location:lat': coordinates[1],
      'timestamp': new Date().getTime(),
      'status': 'active' // ['active', 'completed']
    };
    await client.hmsetAsync(bookingKey, booking);
    return booking;
  },

}
