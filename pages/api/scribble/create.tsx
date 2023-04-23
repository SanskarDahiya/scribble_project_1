import { randomUUID } from "crypto";
import {
  findTokenById,
  findUserByDevice,
  findUserById,
  generateNewScribble,
  updateUserInfo,
} from "firebase-client";
import { NextApiRequest } from "next";
import { Wrapper } from "../../../helper";
import { IConnection, IScribble, IUser } from "../../../types";

export default Wrapper(async (req: NextApiRequest) => {
  const requestId = req.headers["x-request-id"] as string;
  const access_token = req.headers["authorization"] as string;
  const { message, from, to } = req.body;
  if (!to || !message || !message.trim() || message.trim().length <= 10) {
    throw new Error("Invalid Username or Password or Email");
  }

  const to_user = (await findUserById(to)) as unknown as IUser | null;
  if (!to_user) {
    throw new Error("No user found to send message.");
  }
  let fromUser;
  {
    try {
      if (access_token) {
        const connInfo = (await findTokenById(
          access_token
        )) as unknown as IConnection | null;
        if (connInfo?.userId) {
          fromUser = (await findUserById(
            connInfo.userId
          )) as unknown as IUser | null;
        }
      }
    } catch (err) {}
  }

  {
    try {
      if (!fromUser && requestId) {
        fromUser = (await findUserByDevice(
          requestId
        )) as unknown as IUser | null;
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
    await updateUserInfo(fromUser._id, {
      $set: {
        _updatedOn: new Date(),
      },
      $inc: {
        sendMessageCount: 1,
      },
    });
  }
  await updateUserInfo(to, {
    $set: {
      _updatedOn: new Date(),
    },
    $inc: {
      getMessageCount: 1,
    },
  });

  await generateNewScribble(scribbleData);
  return { success: true };
});
