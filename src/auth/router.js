"use steict";

const base64 = require("base-64");
const bcrypt = require("bcrypt");

const express = require("express");

const { User1 } = require("./index");

const signInUp = express.Router();


signInUp.post("/signup", async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await User1.create(req.body);
    res.status(200).json(record);
  } catch (e) {
    res.status(403).send("Error Creating User");
  }
});

signInUp.post("/signin", async (req, res) => {
  if (req.headers.authorization) {
    //Basic YWhtYWQ6YWhtYWQxMjM=
    let basicHeaderParts = req.headers.authorization.split(" ");
    //basicHeaderParts = ['Basic','YWhtYWQ6YWhtYWQxMjM=']

    let encoded = basicHeaderParts[1];
    //encoded = 'YWhtYWQ6YWhtYWQxMjM='

    let decoded = base64.decode(encoded);
    //decoded = "username:password"
    let username = decoded.split(":")[0];
    let password = decoded.split(":")[1];

    /* let [username,password] = decoded.split(":");*/
    try {
      const user = await User1.findOne({ where: { username: username } });
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        res.status(200).json({
          user,
        });
      } else {
        res.status(500).send("wrong username or password");
      }
    } catch {
      res.status(500).send("app error");
    }
  }
});

module.exports = signInUp;
