const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Animation" },
  { id: 3, name: "Mystery" },
];

// Response statuses
// 200 = Ok
// 400 = Bad Request
// 404 = Not found

// Helper functions
const validateGenre = (genre) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(genre, schema);
};

// Retrieve information
app.get("/", (req, res) => {
  return res.send("Hello from Video Axis");
});

app.get("/api/genres", (req, res) => {
  return res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send("The genre was not found with the given ID");
  }
  return res.send(genre);
});

// Receiving route parameters or query ?sortBy=name
app.get("/api/genres/:year/:director", (req, res) => {
  //   res.send(req.params);
  return res.send(req.query);
});

// Register information
app.post("/api/genres", (req, res) => {
  // Validate user input
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  genres.push(genre);
  return res.send(genre);
});

// Update information
app.put("/api/genres/:id", (req, res) => {
  // Check if the id info does exist
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send("The genre was not found with the given ID");
  }
  // Validate user input
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // Update the information
  genre.name = req.body.name;
  return res.send(genre);
});

// Delete an information
app.delete("/api/genres/:id", (req, res) => {
  // Check if the id info does exist
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send("The genre was not found with the given ID");
  }

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  return res.send(genre);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
