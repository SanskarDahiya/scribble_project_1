const { getModel, getSchema } = require("./schemaModel");

const userSchema = {
  _id: String,
  username: String,
  password: String,
  name: String,
  deviceInfo: Object,
  totalMessages: Number,
  age: Number
};

const scribbleSchema = {
  message: String,
  from: Object,
  to: Object,
  comment: Object
};

const userDB = getModel("UserTable", getSchema(userSchema));
const scribbleDB = getModel("ScribbleTable", getSchema(scribbleSchema));

module.exports = {
  userDB,
  scribbleDB
};
