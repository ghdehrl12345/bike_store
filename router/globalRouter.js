const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("screens/main");
});

router.get("/signup", (req, res, next) => {
  res.render("screens/signup");
});

module.exports = router;
