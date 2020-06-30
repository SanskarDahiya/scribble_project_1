// const api = require("../apis/api");
const express = require("express");
const router = express.Router();
const { scribbleDB } = require("../Schemas/index");
const { getMethods } = require("../apis/index");
const api = getMethods(scribbleDB);

router.all(`/`, (req, res) => {
  res.sendStatus(200).send("scribe");
});

router.all("*", (req, res) => {
  res.sendStatus(401);
});

module.exports = router;
