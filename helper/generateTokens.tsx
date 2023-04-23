import { randomUUID } from "crypto";
import { generateNewToken, removeOldTokens } from "firebase-client";
import { IConnection, IUser, modifyUser } from "../types";
import { encrypt } from "./encrypt";

export const GenerateNewToken = async (user: IUser) => {
  const accessToken = await encrypt(user._id + "__user_access_token");
  const refreshToken = await encrypt(user._id + "__user_refresh_token");

  await removeOldTokens(user._id, {
    accessToken,
  });

  const doc: IConnection = {
    _id: randomUUID(),
    duration: 7200, // seconds
    userId: user._id,
    deviceId: user.device,
    access_token: accessToken,
    refresh_token: refreshToken,
    _createdOn: new Date(),
    _updatedOn: new Date(),
    deleted: false,
  };

  await generateNewToken(doc);
  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    user: modifyUser(user),
  };
};
