const myDB = require("../Schemas/index");
const { search } = require("../routes/userRoute");
//Use User Login Schema
// For mongodb Id's

module.exports = {
  getMethods: db => ({
    getDataById: id => db.find({ _id }),
    addData: data => db.create(data),
    getSingleData: search => db.findOne(search),
    getAllData: search => db.find(search),
    removeData: search => db.remove(search)
  }),
  getDataById: db => _id => db.find({ _id }),
  addData: db => data => db.create(data),
  getSingleData: db => search => db.findOne(search),
  getAllData: db => search => db.find(search),
  removeData: db => search => db.remove(search)
};
