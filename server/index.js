require("dotenv").config();
const express = require("express");
const sequelize = require("./db.js");
const cors = require("cors");
const router = require("./routes/index.js");

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(PORT, console.log(`Server is going on ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
