// const api = require("../apis/api");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { scribbleDB, userDB } = require("../Schemas/index");
const db = require("../apis/index");
const { serverPrefix } = require("../apis/serverHoc");
const { encPassword } = require("../apis/encryption");
const { getMethods } = db;
const api = getMethods(scribbleDB);
const ObjectId = mongoose.Types.ObjectId;

const createScribble = async (req) => {
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
    result = await api.addData({ message, to, from, _createdOn: new Date().getTime() });
    console.log(result);

  } catch (err) {
    throw err;
  }
  return result ? [result] : [];
};

const getScribbleByUserId = async (req) => {
  const { _id } = req.body;
  if (!_id) {
    let err = new Error();
    err.message = "Insufficient Params";
    err.code = "Insufficient Params";
    throw err;
  }
  const query = { "to._id": (_id + "").toLowerCase() };
  const result = await api.getAllData(query);
  console.log(result);

  return result || [];
};

const addComment = async (req) => {
  const { _id, comment } = req.body;
  if (!_id || !comment) {
    let err = new Error();
    err.message = "Insufficient Params";
    err.code = "Insufficient Params";
    throw err;
  }
  const find = { _id: ObjectId(_id) };
  const result = await api.getSingleData(find);
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
  await api.updateData(find, update);
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
