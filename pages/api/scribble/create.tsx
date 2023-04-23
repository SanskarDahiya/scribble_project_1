import { randomUUID } from "crypto";
import { getClientDb } from "mongo-client";
import { NextApiRequest } from "next";
import { TABLES } from "../../../constants";
import { Wrapper } from "../../../helper";
import { IConnection, IScribble, IUser } from "../../../types";

export default Wrapper(async (req: NextApiRequest) => {
  const requestId = req.headers["x-request-id"] as string;
  const access_token = req.headers["authorization"] as string;
  const { message, from, to } = req.body;
  if (!to || !message || !message.trim() || message.trim().length <= 10) {
    throw new Error("Invalid Username or Password or Email");
  }
  const db = await getClientDb();

  const to_user = (await db
    .collection(TABLES.user)
    .findOne({ _id: to })) as unknown as IUser | null;
  if (!to_user) {
    throw new Error("No user found to send message.");
  }
  let fromUser;
  {
    try {
      if (access_token) {
        const connInfo = (await db.collection(TABLES.connection).findOne({
          access_token: access_token,
        })) as unknown as IConnection | null;
        if (connInfo?.userId) {
          fromUser = (await db
            .collection(TABLES.user)
            // @ts-ignore
            .findOne({ _id: connInfo.userId })) as unknown as IUser | null;
        }
      }
    } catch (err) {}
  }

  {
    try {
      if (!fromUser && requestId) {
        fromUser = (await db
          .collection(TABLES.user)
          .findOne({ device: requestId })) as unknown as IUser | null;
      }
    } catch (err) {}
  }

  const scribbleData: IScribble = {
    _id: randomUUID(),
    _createdOn: new Date(),
    _updatedOn: new Date(),
    deleted: false,
    message: JSON.stringify(message),
    from: from,
    fromUserId: fromUser?._id,
    deviceId: requestId,
    to: to,
    isPublic: (to_user?.username || to) === "nazdeekiyaan",
    comments: [],
  };

  if (fromUser?._id) {
    await db.collection(TABLES.user).findOneAndUpdate(
      // @ts-ignore
      { _id: fromUser._id },
      {
        $set: {
          _updatedOn: new Date(),
        },
        $inc: {
          sendMessageCount: 1,
        },
      }
    );
  }
  await db.collection(TABLES.user).findOneAndUpdate(
    // @ts-ignore
    { _id: to },
    {
      $set: {
        _updatedOn: new Date(),
      },
      $inc: {
        getMessageCount: 1,
      },
    }
  );
  // @ts-ignore
  await db.collection(TABLES.scribble).insertOne(scribbleData);
  return { success: true };
});
