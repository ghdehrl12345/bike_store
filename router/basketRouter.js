const express = require("express");
const checkLogin = require("../middlewares/checkLogin");
const db = require("../db")


const router = express.Router();


router.get("/basket", checkLogin, (req, res, next) => {
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

  return res.render("screens/basket", { loggedIn, baskets });
    });
  } catch (error) {
    return res.redirect("/");
  }
});


router.post("/basketCreate", (req, res) => {
  const basketinsertQuery = `
      INSERT INTO bikes (
          title,
          price,
          brand
          bikeId
      ) VALUES (
          "${req.body.title}",
          ${req.body.price},
          "${req.body.brand}",
          ${req.body.bikeId}
      )
      `;

  try {
    db.query(basketinsertQuery, (error, basket) => {
      if (error) {
        console.error(error);
      }
      res.redirect("/basket");
    });
  } catch (error) {
    console.error(error);
    res.redirect("/");
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
