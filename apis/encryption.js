const crypto = require("crypto");

module.exports = {
  encPassword: password => {
    const mykey = crypto.createCipher("aes-128-cbc", password + "");
    let myStr = mykey.update("abc", "utf8", "hex");
    myStr += mykey.final("hex");
    return myStr;
  }
};
