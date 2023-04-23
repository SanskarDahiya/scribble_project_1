import { randomUUID } from "crypto";
import { getClientDb } from "mongo-client";
import { TABLES } from "../constants";
import { IConnection, IUser, modifyUser } from "../types";
import { encrypt } from "./encrypt";

export const GenerateNewToken = async (user: IUser) => {
  const db = await getClientDb();

  await db.collection(TABLES.connection).updateMany(
    { userId: user._id, deleted: false },
    {
      $set: {
        deleted: true,
        _updatedOn: new Date(),
        access_token: "",
        refresh_token: "",
      },
    }
  );

  await db
    .collection(TABLES.connection)
    .deleteMany({ userId: user._id, deleted: true });

  const accessToken = await encrypt(user._id + "__user_access_token");
  const refreshToken = await encrypt(user._id + "__user_refresh_token");

  await db
    .collection(TABLES.connection)
    .updateMany(
      { access_token: accessToken, deleted: false },
      { $set: { deleted: true, _updatedOn: new Date() } }
    );
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
  // @ts-ignore
  await db.collection(TABLES.connection).insertOne(doc);
  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    user: modifyUser(user),
  };
};
