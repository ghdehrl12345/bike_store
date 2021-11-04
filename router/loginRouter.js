const express = require("express");
const checkLogin = require("../middlewares/checkLogin");
const db = require("../db");

const router = express.Router();

router.post("/userCreate", (req, res) => {
    const userinsertQuery = `
        INSERT INTO users (
            userId,
            userPassword,
            nickanme,
            phone,
            gender,
            hobby
        ) VALUES (
            "${req.body.userId}",
            "${req.body.userPassword}",
            "${req.body.nickanme}",
            "${req.body.phone}",
            "${req.body.gender}",
            "${req.body.hobby}"
        )
        `;
  
    try {
      db.query(userinsertQuery, (error, users) => {
        if (error) {
          console.error(error);
        }
        res.redirect("/signup");
      });
    } catch (error) {
      console.error(error);
      res.redirect("/");
    }
  });








module.exports = router;
