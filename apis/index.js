const myDB = require("../Schemas/index");
const { search } = require("../routes/userRoute");
//Use User Login Schema
// For mongodb Id's

module.exports = {
  getMethods: (db) => ({
    getDataById: (_id, filter) => db.find({ _id }, filter),
    addData: (data) => db.create(data),
    getSingleData: (search, filter) => db.findOne(search, filter).sort({ _createdOn: -1 }),
    getAllData: (search, filter) => db.find(search, filter).sort({ _createdOn: -1 }),
    removeData: (search) => db.remove(search),
    updateData: (find, update) => db.updateOne(find, update),
  }),
  getDataById: (db) => (_id, filter) => db.find({ _id }, filter),
  addData: (db) => (data) => db.create(data),
  getSingleData: (db) => (search, filter) => db.findOne(search, filter).sort({ _createdOn: -1 }),
  getAllData: (db) => (search, filter) => db.find(search, filter).sort({ _createdOn: -1 }),
  removeData: (db) => (search) => db.remove(search),
  updateData: (db) => (find, update) => db.updateOne(find, update),
};
