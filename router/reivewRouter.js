const express = require("express");
const mysql2 = require("mysql2");
const db = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  const reviewsSelectQuery = `
          SELECT    id,
                    score,
                    title,
                    content,
                    createdAt,
                    UserId
            FROM    reviews
      `;
  try {
    db.query(reviewsSelectQuery, (error, reviews) => {
      console.log(reviews);

      res.render("screens/review", { reviews });
    });
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
});

router.post("/reviewCreate", (req, res) => {
  const createQuery = `
      INSERT INTO reivews (
        score,
        title,
        content,
        createdAt,
        UserId
      ) VALUES (
        "${req.body.score}",
        "${req.body.title}",
        "${req.body.content}",
        now(),
        1
      )
      `;

  try {
    db.query(createQuery, (error, reviews) => {
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

module.exports = router;
