require('express-async-errors');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cabs = require('./routes/cabs');
const bookings = require('./routes/bookings');


const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(cors());

// list routes
app.use('/api/cabs', cabs);
app.use('/api/bookings', bookings);

// internal server error
app.use((error, req, res, next) => {
  res.status(500).send({message: error.message});
});


// unhandled rejection
process.on('unhandledRejection', (ex) => {
  throw ex;
});

// process exception
process.on('uncaughtException', (ex) => {
  console.log(ex);
});


const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listeining on port ${port} ...`))
