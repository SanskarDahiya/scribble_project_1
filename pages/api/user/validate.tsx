import { findUserById, updateUserInfo } from "firebase-client";
import { NextApiRequest } from "next";
import { Wrapper } from "../../../helper";
import { compare } from "../../../helper/encrypt";
import { GenerateNewToken } from "../../../helper/generateTokens";
import { IUser } from "../../../types";

export default Wrapper(async function handler(req: NextApiRequest) {
  const requestId = req.headers["x-request-id"] as string;
  const { username, password } = req.body;
  if (
    !username ||
    !password ||
    !username.trim() ||
    !password.trim() ||
    username.trim().length <= 3 ||
    password.trim().length <= 3
  ) {
    throw new Error("Invalid Username or Password");
  }
  const userInfo = (await findUserById(username)) as unknown as IUser | null;

  if (!userInfo) {
    throw new Error("Invalid Username or Password");
  }
  if (userInfo.deleted) {
    throw new Error("User is Banned!!. please contact admin");
  }

  const comparePassword = await compare(
    password + "__" + username,
    userInfo.password
  );

  if (!comparePassword) {
    throw new Error("Username or Password did not match");
  }
  // Now will assign access_token & refresh_token
  if (requestId) {
    await updateUserInfo(userInfo._id, {
      $set: { device: requestId, _updatedOn: new Date() },
    });
  }
  const result = await GenerateNewToken({
    ...userInfo,
    device: requestId || userInfo.device,
  });
  return JSON.stringify({ success: true, ...result });
});
