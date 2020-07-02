const { getModel, getSchema } = require("./schemaModel");

const userSchema = {
  _id: String,
  username: String,
  password: String,
  name: String,
  deviceInfo: Object,
  totalMessages: Number,
  age: Number,
  _createdOn: Number,
  _updatedOn: Number,
};

const scribbleSchema = {
  message: Object,
  from: Object,
  to: Object,
  comment: Object,
  _updatedOn: Number,
  _createdOn: Number,
};

const userDB = getModel("UserTable", getSchema(userSchema));
const scribbleDB = getModel("ScribbleTable", getSchema(scribbleSchema));

module.exports = {
  userDB,
  scribbleDB,
};
