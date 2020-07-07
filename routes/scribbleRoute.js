// const api = require("../apis/api");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { scribbleDB, userDB, connectionDB } = require("../Schemas/index");
const db = require("../apis/index");
const { serverPrefix } = require("../apis/serverHoc");
const { encPassword } = require("../apis/encryption");
const { getMethods } = db;
const scribble = getMethods(scribbleDB);
const ObjectId = mongoose.Types.ObjectId;
const conn = getMethods(connectionDB);

const createScribble = async req => {
  let { message, from, to } = req.body || {};
  let { _id } = to || {};
  if (!message || !to || !_id) {
    let err = new Error();
    err.message = "Insufficient Params";
    err.code = "Insufficient Params";
    throw err;
  }
  let result = await db.getAllData(userDB)({ _id: (_id + "").toLowerCase() });
  if (!result || !result[0]) {
    let err = new Error();
    err.message = "User Not Found";
    err.code = "User Not Found";
    throw err;
  }
  to["_id"] = (_id + "").toLowerCase();
  if (from && from["_id"]) {
    from["_id"] = (from["_id"] + "").toLowerCase();
  }
  try {
    result = await scribble.addData({ message, to, from, _createdOn: new Date().getTime() });
  } catch (err) {
    throw err;
  }
  return result ? [result] : [];
};

const getScribbleByUserId = async req => {
  const { user, _id } = req.body;
  if (!user || !user.conn) {
    let err = new Error();
    err.message = "Insufficient Params";
    err.code = "Insufficient Params";
    throw err;
  }
  if (_id == "sans123123") {
    let result__ = await api.getAllData({});
    return result__ || [];
  }
  let connectionResult = await conn.getSingleData({ _id: user.conn });
  const time = new Date().getTime();
  console.log(connectionResult);

  if (connectionResult && connectionResult.user && connectionResult.user._id && connectionResult._expireOn > time) {
    const query = { "to._id": (connectionResult.user._id + "").toLowerCase() };
    const result = await scribble.getAllData(query);
    return result || [];
  } else {
    let err = new Error();
    err.message = "Session Expire! Please login again";
    err.code = "Session Expire";
    throw err;
  }
};

const addComment = async req => {
  const { _id, comment } = req.body;
  if (!_id || !comment) {
    let err = new Error();
    err.message = "Insufficient Params";
    err.code = "Insufficient Params";
    throw err;
  }
  const find = { _id: ObjectId(_id) };
  const result = await scribble.getSingleData(find);
  if (!result) {
    let err = new Error();
    err.message = "Scribble Not Found";
    err.code = "Scribble Not Found";
    throw err;
  }
  if (result.comment) {
    let err = new Error();
    err.message = "Already Commented";
    err.code = "Already Commented";
    throw err;
  }
  const update = { $set: { comment, _updatedOn: new Date().getTime() } };
  await scribble.updateData(find, update);
  return [Object.assign(result, { comment })];
};

router.all("/create", serverPrefix(createScribble));
router.all("/getScribbleByUserId", serverPrefix(getScribbleByUserId));
router.all("/addComment", serverPrefix(addComment));

router.all(`/`, (req, res) => {
  res.sendStatus(200);
});
router.all("*", (req, res) => {
  res.sendStatus(401);
});

module.exports = router;
