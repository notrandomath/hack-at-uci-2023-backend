const express = require("express");
const router = express.Router();

router.get("/sms", async (req, res) => {
  res.json({test: "something"})
});

module.exports = router;
