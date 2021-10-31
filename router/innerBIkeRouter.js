const express = require("express");
const checkLogin = require("../middlewares/checkLogin");
const db = require("../db")


const router = express.Router();


router.get("/innerbike", checkLogin, (req, res, next) => {
  const loggedIn = req.session.isLoggedIn;


  const basketSelectQuery = `
  SELECT    id,
            title,
            price,
            brand
    FROM    bikes
`;

try {
    db.query(basketSelectQuery, (error, baskets) => {
      console.log(bikes);

  return res.render("screens/basket", { loggedIn, bikes });
    });
  } catch (error) {
    return res.redirect("/");
  }
});


router.get("/innerbike",checkLogin, (req, res, next) => {
  const loggedIn = req.session.isLoggedIn;
  res.render("screens/innerBike", { loggedIn });
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
