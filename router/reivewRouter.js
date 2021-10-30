const express = require("express");
const checkLogin = require("../middlewares/checkLogin")
const db = require("../db");

const router = express.Router();



router.get("/list", checkLogin, (req, res, next) => {
  const loggedIn = req.session.isLoggedIn;

  const reviewsSelectQuery = `
  SELECT    id,
            score,
            title,
            content,
            createdAt,
            userKey,
            bikeId
    FROM    reviews
`;

try {
    db.query(reviewsSelectQuery, (error, reviews) => {
      console.log(reviews);

      res.render("screens/review/list", { loggedIn, reviews });
    });
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
});

router.get("/detail", checkLogin, (req, res, next) => {
  const loggedIn = req.session.isLoggedIn;
  res.render("screens/review/detail", { loggedIn });
});

router.get("/write",checkLogin , (req, res, next) => {
  const loggedIn = req.session.isLoggedIn;

  res.render("screens/review/write", { loggedIn });
});

router.post("/reviewCreate", (req, res) => {
  const insertQuery = `
      INSERT INTO reivews (
          score,
          title,
          content,
          createdAt
      ) VALUES (
          "${req.body.score}",
          "${req.body.title}",
          "${req.body.content}",
          now()          
      )
      `;

  try {
    db.query(insertQuery, (error, reviews) => {
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

router.get("/update", checkLogin ,(req, res, next) => {
  const loggedIn = req.session.isLoggedIn;
  res.render("screens/review/update", { loggedIn });
});


module.exports = router;
