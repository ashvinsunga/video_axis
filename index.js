// import routes
const genres = require("./routes/genres");
const home = require("./routes/home");

// import third party middleware
const express = require("express");
const app = express();

// views
app.set("view engine", "pug");
app.set("views", "./views");

// import third party packages
const Joi = require("joi");

app.use(express.json());
app.use("/", home);
app.use("/api/genres", genres);

// SET using 'set PORT=4000'
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
