const redis = require('redis');
const bluebird = require('bluebird');
const config = require('../config');



// Promisify all the functions exported by node_redis.
bluebird.promisifyAll(redis);

// Create a client and connect to Redis using configuration
// from config.json.
const clientConfig = {
  host: config.redis.host,
  port: config.redis.port,
};

if (config.redis.password) {
  clientConfig.password = config.redis.password;
}

const client = redis.createClient(clientConfig);

// This is a catch all basic error handler.
client.on('error', error => console.log(error));

module.exports = {
  /**
   * Get the application's connected Redis client instance.
   *
   * @returns {Object} - a connected node_redis client instance.
   */
  getClient: () => client,
};
