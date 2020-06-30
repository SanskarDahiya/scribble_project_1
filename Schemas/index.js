const { getModel, getSchema } = require("./schemaModel");

const userSchema = {
  _id: String,
  username: String,
  password: String,
  name: String
};

const scribbleSchema = {
  message: String
};

const userDB = getModel("UserTable", getSchema(userSchema));
const scribbleDB = getModel("ScribbleTable", getSchema(scribbleSchema));

module.exports = {
  userDB,
  scribbleDB
};
