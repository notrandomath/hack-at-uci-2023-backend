const express = require("express");
const router = express.Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

router.post("/sms", async (req, res) => {
  client.messages
    .create({
      body: `Message sent from ${req.body.user}: ${req.body.message}`,
      from: "+18333421298",
      to: req.body.number
    })
    .then((message) => console.log(message.sid));
  res.json({ test: "something" });
});

module.exports = router;
