const { writeJsonResponse } = require("../apis/jsonResp");
const express = require("express");
const router = express.Router();
const { userDB } = require("../Schemas/index");
const { getMethods } = require("../apis/index");
const { serverPrefix } = require("../apis/serverHoc");
const api = getMethods(userDB);

const createUser = async req => {
  const { data } = req.body;
  if (!data) {
    let err = new Error();
    err.message = "Insufficient Params";
    err.code = "Insufficient Params";
    throw err;
  }
  return await api.addData(data);
};

router.all("/create", serverPrefix(createUser));

router.all(`/`, (req, res) => {
  res.sendStatus(200);
});
router.all("*", (req, res) => {
  res.sendStatus(401);
});

module.exports = router;
