// import models
const { Rental, validateRental } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const { Router } = require("express");
const router = Router();
const Fawn = require("fawn");
//
const auth = require("../middleware/auth");

Fawn.init("mongodb://localhost:27017/video_axis");
// Fawn.init(mongoose);
// Response statuses
// 200 = Ok
// 400 = Bad Request
// 404 = Not found

// Retrieve information
router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  return res.send(rentals);
});

// Register information
router.post("/", auth, async (req, res) => {
  // Validate user input
  const { error } = validateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie.");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  // If one of the operation fails, everything will be rolledback
  try {
    new Fawn.Task()
      .save("rentals", rental)
      .update(
        "movies",
        { _id: movie._id },
        {
          $inc: { numberInStock: -1 },
        }
      )
      .run()
      .then(function (results) {
        return res.send(rental);
      });
  } catch (ex) {
    // 500 = Internal Server Error
    res.status(500).send(ex, "Something failed.");
  }
});

module.exports = router;
