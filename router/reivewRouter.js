const express = require("express");
const mysql2 = require("mysql2");
const db = require("../db");

const router = express.Router();




router.get("/list", (req, res, next) => {
  const loggedIn = req.session.isLoggedIn;
  res.render("screens/review/list", { loggedIn });
});

router.get("/detail", (req, res, next) => {
  const loggedIn = req.session.isLoggedIn;
  res.render("screens/review/detail", { loggedIn });
});

router.get("/write", (req, res, next) => {
  const loggedIn = req.session.isLoggedIn;
  res.render("screens/review/write", { loggedIn });
});

router.get("/update", (req, res, next) => {
  const loggedIn = req.session.isLoggedIn;
  res.render("screens/review/update", { loggedIn });
});


module.exports = router;
