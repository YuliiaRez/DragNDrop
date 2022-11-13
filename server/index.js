require("dotenv").config();
const express = require("express");
const sequelize = require("./db.js");
const models = require("./models/models.js");
const cors = require("cors");
const router = require("./routes/index.js");

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

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
