const { getModel, getSchema } = require("./schemaModel");

const userSchema = {
  _id: String,
  username: String,
  password: String,
  device: Object,
  name: String,
  alertCount: Boolean,
  totalMessages: Number,
  age: Number,
  newName: String,
  _createdOn: Number,
  _updatedOn: Number,
  EXTRA: Object
};

const scribbleSchema = {
  message: Object,
  from: Object,
  to: Object,
  isPublic: Boolean,
  comment: Object,
  _updatedOn: Number,
  _createdOn: Number,
  EXTRA: Object
};
const connectionsSchema = {
  _id: String,
  user: Object,
  _createdOn: Number,
  _expireOn: Number,
  EXTRA: Object
};
const userDB = getModel("UserTable", getSchema(userSchema));
const scribbleDB = getModel("ScribbleTable", getSchema(scribbleSchema));
const connectionDB = getModel("ConnectionsTable", getSchema(connectionsSchema));

module.exports = {
  userDB,
  scribbleDB,
  connectionDB
};
