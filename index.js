const express = require("express");
const app = express();
const port = process.env.PORT || 3999;

app.use(express.json());

const db = require("./models");

// Routers
const twilioRouter = require("./routes/Twilio");
app.use("/twilio", twilioRouter);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});