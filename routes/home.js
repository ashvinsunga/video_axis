const { Router } = require("express");
const router = Router();

// Pug templating engine will render this
router.get("/", (req, res) => {
  return res.render("index", {
    title: "Video axis",
    message: "Hello from Video axis",
  });
});

module.exports = router;
