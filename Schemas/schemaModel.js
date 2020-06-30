const mongoose = require("mongoose");
module.exports = {
  getSchema: (entities, version = false) => {
    return mongoose.Schema(entities, { versionKey: version ? true : false });
  },
  getModel: (modelName, schema) => {
    return mongoose.model(modelName, schema);
  }
};
