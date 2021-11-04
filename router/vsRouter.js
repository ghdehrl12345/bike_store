const express = require("express");
const checkLogin = require("../middlewares/checkLogin")
const db = require("../db");

const router = express.Router();


router.get("/", checkLogin, (req, res, next) => {
  
    const loggedIn = req.session.isLoggedIn;
  
    const bikesSelectQuery = `
    SELECT    id,
              title,
              price,
              brand
      FROM    bikes
    `;

  
  try {
      db.query(bikesSelectQuery, (error, bikes) => {
  
    return res.render("screens/vs", { loggedIn, bikes });
      });
    } catch (error) {
      return res.redirect("/");
    }
});

module.exports = router;
