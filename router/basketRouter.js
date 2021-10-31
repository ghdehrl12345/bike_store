const express = require("express");
const checkLogin = require("../middlewares/checkLogin");
const db = require("../db")


const router = express.Router();


router.get("/", checkLogin, (req, res, next) => {
  
  const loggedIn = req.session.isLoggedIn;

  const basketsSelectQuery = `
  SELECT    id,
            title,
            brand,
            price,
            userKey,
            bikeId
    FROM    baskets
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
    db.query(basketsSelectQuery, (error, baskets) => {
      db.query(bikesSelectQuery, (error, bikes) => {
        db.query(usersSelectQuery, (error, users) => {
          res.render("screens/basket", { loggedIn, baskets , bikes, users});
        })
      })
      
    });
  } catch (error) {
    console.log(error);
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
          ${req.body.bikeId},
          ${req.body.userKey},
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


router.post("/basketDelete", (req, res, next) => {
  const { id } = req.body;

  try {
    const basketdeleteQuery = `
      DELETE  FROM bikes
       WHERE  id = ${id}
    `;

    db.query(basketdeleteQuery, (error, baskets) => {
      if (error) {
        return res.status(400).send("삭제 중 에러 발생!");
      }
      res.redirect("/");
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send("삭제에 실패했습니다.");
  }
});


module.exports = router;
