const express = require("express");
const checkLogin = require("../middlewares/checkLogin")

const router = express.Router();

router.get("/", checkLogin, (req, res, next) => {
  const loggedIn = req.session.isLoggedIn;

  res.render("screens/main", { loggedIn });
});

router.get("/signup", checkLogin, (req, res, next) => {
  const loggedIn = req.session.isLoggedIn;

  res.render("screens/signup", { loggedIn });
});

router.get("/signin", checkLogin, (req, res, next) => {
  const loggedIn = req.session.isLoggedIn;

  res.render("screens/signin", { loggedIn });
});

router.get("/review" , checkLogin, (req,res,next) => {
  const loggedIn = req.session.isLoggedIn;

  res.render("/screens/review/detail",{ loggedIn });
});

module.exports = router;
