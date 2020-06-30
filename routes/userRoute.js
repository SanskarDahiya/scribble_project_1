const { writeJsonResponse } = require("../apis/jsonResp");
const express = require("express");
const router = express.Router();
const { userDB } = require("../Schemas/index");
const { getMethods } = require("../apis/index");
const { serverPrefix } = require("../apis/serverHoc");
const { query } = require("express");
const { encPassword } = require("../apis/encryption");
const api = getMethods(userDB);

const createUser = async (req) => {
  const { data } = req.body;
  let { password, _id } = data;
  if (!data || !_id || !password) {
    let err = new Error();
    err.message = "Insufficient Params";
    err.code = "Insufficient Params";
    throw err;
  }
  password = encPassword(password);
  return await api.addData({ ...data, password });
};

const validateUser = async (req) => {
  const { username, password } = req.body;
  if (!username || !password) {
    let err = new Error();
    err.message = "Insufficient Params";
    err.code = "Insufficient Params";
    throw err;
  }
  const query = { $and: [{ _id: username }, { password: encPassword(password) }] };
  return await api.getSingleData(query);
};
const getUserById = async (req) => {
  const { _id } = req.body;

  if (!_id) {
    let err = new Error();
    err.message = "Insufficient Params";
    err.code = "Insufficient Params";
    throw err;
  }
  const query = { _id };
  const result = await api.getSingleData(query);
  console.log("recived", result);
  return result || [];
};
router.all("/create", serverPrefix(createUser));
router.all("/validate", serverPrefix(validateUser));
router.all("/getUserById", serverPrefix(getUserById));

router.all(`/`, (req, res) => {
  res.sendStatus(200);
});
router.all("*", (req, res) => {
  res.sendStatus(401);
});

module.exports = router;
