require("dotenv").config();
const express = require("express");
const sequelize = require("./db.js");

const PORT = process.env.PORT || 5000;
const app = express();

const start = async () => {
  try {
    sequelize.authenticate();
    sequelize.sync();
    app.listen(5000, console.log(`Server is going on ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();
