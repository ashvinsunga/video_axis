// import models
const { Movie, validateMovie } = require('../models/movie');
const { Genre } = require('../models/genre');
const { Router } = require('express');
const router = Router();

// Response statuses
// 200 = Ok
// 400 = Bad Request
// 404 = Not found

// Retrieve information

router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('name');

  return res.send(movies);
});

// Register information
router.post('/', async (req, res) => {
  // Validate user input
  const { error } = validateMovie(req.body);
  if (error) {
    // return res.status(400).send(error.details[0].message);
  }

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  movie = await movie.save();
  return res.send(movie);
});

// Update information
router.put('/:id', async (req, res) => {
  // Validate user input
  const { error } = validateMovie(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // Check if the id info does exist
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );

  if (!movie) {
    return res.status(404).send('The movie was not found with the given ID');
  }

  // Update the information
  return res.send(movie);
});

// Delete an information
router.delete('/:id', async (req, res) => {
  // Check if the id info does exist
  const movie = await Movie.findByIDAndRemove(req.params.id);
  if (!movie) {
    return res.status(404).send('The movie was not found with the given ID');
  }

  return res.send(movie);
});

module.exports = router;
