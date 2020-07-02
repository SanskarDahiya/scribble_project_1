const { writeJsonResponse } = require("./jsonResp");

module.exports = {
  serverPrefix: (cb) => async (req, res) => {
    try {
      let result = "";
      result = await cb(req, res);
      writeJsonResponse(res, { result });
    } catch (err) {
      console.log(err);
      writeJsonResponse(res, { result: err });
    }
  },
};
