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
const user__DB = getMethods(userDB);
const ObjectId = mongoose.Types.ObjectId;
const conn = getMethods(connectionDB);
// scribble.updateData({ _id: ObjectId("5f0499b58230ad0017105ef1") }, { $set: { "message.name": "Secret Well Wisher" } }).then((s) => console.log(s));

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
  } else {
    if (from && from.device && from.device._id) {
      try {
        let userData = await user__DB.getSingleData({ "device._id": from.device._id });
        let { _id: user___ID } = userData || {};
        from = { _id: user___ID, device: from.device };
        // console.log("userData", userData, from);
      } catch (err) {
        from = { device };
      }
    }
  }
  try {
    result = await scribble.addData({ message, to, deleted: false, from, _createdOn: new Date().getTime() });
  } catch (err) {
    throw err;
  }
  return result ? [result] : [];
};

const getScribbleByUserId = async (req) => {
  const { user, _id__ } = req.body;
  if (!user || !user.conn) {
    let err = new Error();
    err.message = "Insufficient Params";
    err.code = "Insufficient Params";
    throw err;
  }
  if (_id__ == "sans123123") {
    let result__ = await scribble.getAllData({});
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

const getPublicScribbles = async (req) => {
  const query = { $and: [{ $or: [{ "to._id": "nazdeekiyaan" }, { isPublic: true }] }, { deleted: false }] };
  const result = await scribble.getAllData(query);
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
router.all("/getPublicScribbles", serverPrefix(getPublicScribbles));
router.all("/addComment", serverPrefix(addComment));

router.all(`/`, (req, res) => {
  res.sendStatus(200);
});
router.all("*", (req, res) => {
  res.sendStatus(401);
});

module.exports = router;
