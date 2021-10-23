const express = require("express");
const mysql2 = require("mysql2");
const db = require("../db");

const router = express.Router;

router.post("/register", (req, res, next) => {
  const emailCheckQuery = `
      SELECT  email
      FROM    users
      WHERE   email = "${req.body.email}"
      `;

  conn.query(emailCheckQuery, (error, result) => {
    if (error) {
      return res.status(403).send("다시 시도해주세요");
    } else {
      if (result.length > 0) {
        return res.status(403).send("이미 가입된 이메일이 존재합니다.");
      } else {
        const userInsertQuery = `
                  INSERT INTO users(
                      email,
                      password,
                      nickname  
                  ) VALUES (
                      "${req.body.email}",
                      "${req.body.password}",
                      "${req.body.nickname}"
                  )
                  `;

        conn.query(userInsertQuery, (error, result) => {
          if (error) {
            console.error(error);
            return res.status(400).send("회원가입에 실패했습니다.");
          } else {
            res.status(201).send("New User Create success");
          }
        });
      }
    }
  });
});

module.exports = router;
