const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3999;

app.use(express.json());

const { Sequelize } = require("sequelize-cockroachdb");
const sequelize = new Sequelize(process.env.DATABASE_URL);

// Routers
const twilioRouter = require("./routes/Twilio");
app.use("/twilio", twilioRouter);

const cockroachdbRouter = require("./routes/Cockroach");
app.use("/cockroachDB", cockroachdbRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});