// const api = require("../apis/api");
const express = require("express");
const router = express.Router();

//Home Page
router.all(`/`, (req, res) => {
  res.send("Home");
});

router.all("*", (req, res) => {
  // All Extra pages
  res.send("404 Not Found");
});

module.exports = router;
