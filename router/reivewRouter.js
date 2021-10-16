const express = require("express");
const mysql2 = require("mysql2");
const db = require("../db");

const router = express.Router();

router.get("/review", (req, res) => {
  const selectQuery = `
          SELECT    id,
                    title,
                    content,
                    createdAt,
                    UserId
          FROM      review
      `;
  try {
    db.query(selectQuery, (error, result) => {
      res.render("screens/reivew", { result });
    });
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
});

router.post("/reviewCreate", (req, res) => {
  const createQuery = `
      INSERT INTO reivews (
        title,
        content,
        createdAt,
        UserId
      ) VALUES (
        "${title}",
        "${content}",
        now(),
        1
      )
      `;

  try {
    db.query(createQuery, (error, result) => {
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
