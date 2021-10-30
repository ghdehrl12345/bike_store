const express = require("express");
const checkLogin = require("../middlewares/checkLogin");
const db = require("../db")


const router = express.Router();


router.get("/list",checkLogin, (req, res, next) => {
  const loggedIn = req.session.isLoggedIn;
  res.render("screens/innerBike/list", { loggedIn });
});

router.get("/detail",checkLogin, (req, res, next) => {
  const loggedIn = req.session.isLoggedIn;
  res.render("screens/innerBike/detail", { loggedIn });
});

router.get("/write",checkLogin, (req, res, next) => {
  const loggedIn = req.session.isLoggedIn;
  res.render("screens/innerBike/write", { loggedIn });
});

router.get("/update",checkLogin, (req, res, next) => {
  const loggedIn = req.session.isLoggedIn;
  res.render("screens/innerBike/update", { loggedIn });
});

module.exports = router;
