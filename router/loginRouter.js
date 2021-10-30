const express = require("express");
const mysql2 = require("mysql2");
const db = require("../db");

const router = express.Router();


router.post("/userCreate", (req, res) => {
    const insertQuery = `
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
      db.query(insertQuery, (error, users) => {
        if (error) {
          console.error(error);
        }
        res.redirect("/signin");
      });
    } catch (error) {
      console.error(error);
      res.redirect("/");
    }
  });






module.exports = router;
