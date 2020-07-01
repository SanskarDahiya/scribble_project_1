const express = require("express");
const router = express.Router();
const { userDB } = require("../Schemas/index");
const { getMethods } = require("../apis/index");
const { serverPrefix } = require("../apis/serverHoc");
const { encPassword } = require("../apis/encryption");
const api = getMethods(userDB);

const createUser = async req => {
  const { user } = req.body;
  let { password, _id } = user || {};
  if (!user || !_id || !password) {
    let err = new Error();
    err.message = "Insufficient Params";
    err.code = "Insufficient Params";
    throw err;
  }
  if (typeof _id != "string") {
    let err = new Error();
    err.message = "_id must be string";
    err.code = "_id must be string";
    throw err;
  }
  _id = (_id + "").toLowerCase();
  password = encPassword(password);
  let result = await api.addData({ ...user, _id, password });

  return result ? [result] : [];
};

const validateUser = async req => {
  const { username, password } = req.body;
  if (!username || !password) {
    let err = new Error();
    err.message = "Insufficient Params";
    err.code = "Insufficient Params";
    throw err;
  }
  const query = { $and: [{ _id: (username + "").toLowerCase() }, { password: encPassword(password) }] };
  const result = await api.getSingleData(query);
  return result ? [result] : [];
};
const getUserById = async req => {
  const { _id } = req.body;
  if (!_id) {
    let err = new Error();
    err.message = "Insufficient Params";
    err.code = "Insufficient Params";
    throw err;
  }
  const query = { _id: (_id + "").toLowerCase() };
  const result = await api.getSingleData(query);
  return result ? [result] : [];
};

const updateUser = async req => {
  const { _id, data = {} } = req.body;
  if (!_id || !data) {
    let err = new Error();
    err.message = "Insufficient Params";
    err.code = "Insufficient Params";
    throw err;
  }
  const { _id: abcd, password, username, ...rest } = data || {};
  if (Object.keys(rest).length <= 0) {
    let err = new Error();
    err.message = "No data to update";
    err.code = "No data to update";
    throw err;
  }
  const find = { _id: (_id + "").toLowerCase() };
  let result = await api.getAllData(find);
  if (!result || !result[0]) {
    let err = new Error();
    err.message = "User Not Found";
    err.code = "User Not Found";
    throw err;
  }
  const update = { $set: rest };
  await api.updateData(find, update);
  result = [Object.assign(result[0], rest)];
  return result || [];
};
router.all("/create", serverPrefix(createUser));
router.all("/validate", serverPrefix(validateUser));
router.all("/getUserById", serverPrefix(getUserById));
router.all("/updateUser", serverPrefix(updateUser));

router.all(`/`, (req, res) => {
  res.sendStatus(200);
});
router.all("*", (req, res) => {
  res.sendStatus(401);
});

module.exports = router;
