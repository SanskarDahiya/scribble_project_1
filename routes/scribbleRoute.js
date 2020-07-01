// const api = require("../apis/api");
const express = require("express");
const router = express.Router();
const { scribbleDB } = require("../Schemas/index");
const { getMethods } = require("../apis/index");
const { serverPrefix } = require("../apis/serverHoc");
const { encPassword } = require("../apis/encryption");
const api = getMethods(scribbleDB);

const createScribble = async req => {
  const { data } = req.body;
  let { message, from, to } = data;
  if (!message || !from || !to) {
    let err = new Error();
    err.message = "Insufficient Params";
    err.code = "Insufficient Params";
    throw err;
  }
  return await api.addData({ message, to, from });
};
const getScribbleByUserId = async req => {
  const { _id } = req.body;
  if (!_id) {
    let err = new Error();
    err.message = "Insufficient Params";
    err.code = "Insufficient Params";
    throw err;
  }
  const query = { "to._id": _id };
  const result = await api.getAllData(query);
  return result || [];
};
const addComment = async req => {
  const { to, from, comment } = req.body;
  if (!_id || !comment) {
    let err = new Error();
    err.message = "Insufficient Params";
    err.code = "Insufficient Params";
    throw err;
  }
  const find = { "from._id": _id };
  const result = await api.getSingleData(find);
  if (!result || !result[0]) {
    let err = new Error();
    err.message = "Scribble Not Found";
    err.code = "Scribble Not Found";
    throw err;
  }
  const update = { $set: { comment } };
  return await api.updateData(find, update);
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
