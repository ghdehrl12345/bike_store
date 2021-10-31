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

router.post("/bikeDelete", (req, res, next) => {
  const { id } = req.body;

  try {
    const deleteQuery = `
      DELETE  FROM bikes
       WHERE  id = ${id}
    `;

    db.query(deleteQuery, (error, bikes) => {
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


router.get("/signup", checkLogin, (req, res, next) => {
  const loggedIn = req.session.isLoggedIn;

  res.render("screens/signup", { loggedIn });
});





router.get("/basket", checkLogin, (req, res, next) => {
  const loggedIn = req.session.isLoggedIn;

  res.render("screens/basket", { loggedIn });
});


module.exports = router;
