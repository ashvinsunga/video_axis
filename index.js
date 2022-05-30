// import routes
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const home = require("./routes/home");

// import third party middleware
const mongoose = require("mongoose");
const express = require("express");
const app = express();

// views
app.set("view engine", "pug");
app.set("views", "./views");

// import third party packages
const Joi = require("joi");

mongoose
  .connect("mongodb://localhost/video_axis")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/", home);
app.use("/api/genres", genres);
app.use("/api/customers", customers);

// SET using 'set PORT=4000'
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
