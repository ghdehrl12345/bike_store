const express = require("express");
const checkLogin = require("../middlewares/checkLogin");

const router = express.Router();


router.get("/list", (req, res, next) => {
  const loggedIn = req.session.isLoggedIn;
  res.render("screens/innerBike/list", { loggedIn });
});

router.get("/detail", (req, res, next) => {
  const loggedIn = req.session.isLoggedIn;
  res.render("screens/innerBike/detail", { loggedIn });
});

router.get("/write", (req, res, next) => {
  const loggedIn = req.session.isLoggedIn;
  res.render("screens/innerBike/write", { loggedIn });
});

router.get("/update", (req, res, next) => {
  const loggedIn = req.session.isLoggedIn;
  res.render("screens/innerBike/update", { loggedIn });
});

module.exports = router;
