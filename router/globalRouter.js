const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("screens/main");
});

router.get("/review", (req, res) => {
  res.render("screens/review");
});

router.get("/bike", (req, res) => {
  res.render("screens/bike");
});

module.exports = router;
