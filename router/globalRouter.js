const express = require("express");
const checkLogin = require("../middlewares/checkLogin")
const db = require("../db")

const router = express.Router();

router.get("/", checkLogin, (req, res, next) => {
  const loggedIn = req.session.isLoggedIn;


  const bikesSelectQuery = `
  SELECT    id,
            title,
            price,
            content,
            weight,
            size,
            wheel,
            brand
    FROM    bikes
`;

try {
    db.query(bikesSelectQuery, (error, bikes) => {
      console.log(bikes);

  return res.render("screens/main", { loggedIn, bikes });
    });
  } catch (error) {
    return res.redirect("/");
  }
});

router.post("/bikeCreate", (req, res) => {
  const insertQuery = `
      INSERT INTO bikes (
          title,
          price,
          content,
          weight,
          size,
          wheel,
          brand
      ) VALUES (
          "${req.body.title}",
          ${req.body.price},
          "${req.body.content}",
          "${req.body.weight}",
          "${req.body.size}",
          "${req.body.wheel}",
          "${req.body.brand}"
      )
      `;

  try {
    db.query(insertQuery, (error, bikes) => {
      if (error) {
        console.error(error);
      }
      res.redirect("/");
    });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});


router.get("/signup", checkLogin, (req, res, next) => {
  const loggedIn = req.session.isLoggedIn;

  res.render("screens/signup", { loggedIn });
});

router.get("/signin", checkLogin, (req, res, next) => {
  const loggedIn = req.session.isLoggedIn;

  res.render("screens/signin", { loggedIn });
});



module.exports = router;
