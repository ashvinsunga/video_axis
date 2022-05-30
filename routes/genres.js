// import models
const { Genre, validateGenre } = require("../models/genre");

const { Router } = require("express");
const router = Router();

// Response statuses
// 200 = Ok
// 400 = Bad Request
// 404 = Not found

// Retrieve information

router.get("/", async (req, res) => {
  const result = await Genre.find().sort("name");
  return res.send(result);
});

// Single document
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    return res.status(404).send("The genre was not found with the given ID");
  }
  return res.send(genre);
});

// Receiving route parameters or query ?sortBy=name
router.get("/:year/:director", (req, res) => {
  //   res.send(req.params);
  return res.send(req.query);
});

// Register information
router.post("/", async (req, res) => {
  // Validate user input
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let genre = new Genre({
    name: req.body.name,
  });

  genre = await genre.save();
  return res.send(genre);
});

// Update information
router.put("/:id", async (req, res) => {
  // Validate user input
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // Check if the id info does exist
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );

  if (!genre) {
    return res.status(404).send("The genre was not found with the given ID");
  }

  // Update the information
  return res.send(genre);
});

// Delete an information
router.delete("/:id", async (req, res) => {
  // Check if the id info does exist
  const genre = await Genre.findByIDAndRemove(req.params.id);
  if (!genre) {
    return res.status(404).send("The genre was not found with the given ID");
  }

  return res.send(genre);
});

module.exports = router;
