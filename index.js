// import routes

const genres = require('./routes/genres');
const customers = require('./routes/customers');
const home = require('./routes/home');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');

// import third party middleware
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// views
app.set('view engine', 'pug');
app.set('views', './views');

mongoose
  .connect('mongodb://localhost:27017/video_axis')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

// SET using 'set PORT=4000'
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
