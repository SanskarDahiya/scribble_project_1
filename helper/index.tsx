import { NextApiRequest, NextApiResponse } from "next";

export const Wrapper = (
  cb: (req: NextApiRequest, res: NextApiResponse) => any
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const result = await cb(req, res);
      if (result instanceof Error) {
        throw result;
      }
      res
        .status(200)
        .end(typeof result !== "string" ? JSON.stringify(result) : result);
    } catch (err: any) {
      const error_code = err?.code;
      const error_message = err?.message;
      res.status(518).end(
        JSON.stringify({
          success: false,
          code: error_code,
          message: error_message,
        })
      );
    }
  };
};

/**
 * 
 * const crypto = require("crypto");

module.exports = {
  encPassword: password => {
    const mykey = crypto.createCipher("aes-128-cbc", password + "");
    let myStr = mykey.update("abc", "utf8", "hex");
    myStr += mykey.final("hex");
    return myStr;
  }
};

 */
