"use strict";

require("dotenv").config();
let PORT= process.env.PORT || 3000;

const express = require("express");
const notFoundHandler = require("./middleware/404");
const errorHandler = require("./middleware/500");
const signInUp = require("./auth/router");

const app = express();
app.use(express.json());

app.use(signInUp);
app.use("*", notFoundHandler);

app.use(errorHandler);

app.get('/',(req,res)=>{
  res.send('welcome to signup signin server')
})




function start(PORT) {
  app.listen(PORT, () => {
    console.log(`WE ARE IN PORT ${PORT}`);
  });
}

module.exports = {
  app: app,
  start: start,
};
