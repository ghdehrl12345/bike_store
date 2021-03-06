const express = require("express");
const checkLogin = require("../middlewares/checkLogin")
const db = require("../db");

const router = express.Router();

router.get("/", checkLogin, (req, res, next) => {
  
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

  const bikesSelectQuery = `
  SELECT    id,
            title,
            price,
            brand
    FROM    bikes
`;
  const usersSelectQuery = `
  SELECT    userKey,
            nickanme
    FROM    users
`;



try {
    db.query(reviewsSelectQuery, (error, reviews) => {
      db.query(bikesSelectQuery, (error, bikes) => {
        db.query(usersSelectQuery, (error, users) => {
          res.render("screens/review", { loggedIn, reviews , bikes, users});
        })
      })
      
    });
  } catch (error) {
    console.log(error);
    return res.redirect("/"); 
  }
});


router.post("/reviewCreate", (req, res) => {
  const insertQuery = `    
      INSERT INTO reviews (
          score,
          title,
          content,
          createdAt,
          userKey,
          bikeId
      )	VALUES	(
          ${req.body.score},
          "${req.body.title}",
          "${req.body.content}",
          NOW(),
          ${req.body.userKey},
          ${req.body.bikeId}
      )
      `;

  try {
    db.query(insertQuery, (error, reviews) => {
      if (error) {
        console.error(error);
      }
      res.redirect("/review");
    });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});


router.post("/reivewDelete", (req, res, next) => {
  const { id } = req.body;

  try {
    const deleteQuery = `
      DELETE  FROM reviews
       WHERE  id = ${id}
    `;

    db.query(deleteQuery, (error, reviews) => {
      if (error) {
        return res.status(400).send("삭제 중 에러 발생!");
      }

      res.redirect("/review");
    });
  } catch (error) { 
    console.error(error);
    return res.status(400).send("삭제에 실패했습니다.");
  }
});




module.exports = router;
