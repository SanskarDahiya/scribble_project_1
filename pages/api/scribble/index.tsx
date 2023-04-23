import { getClientDb } from "mongo-client";
import { NextApiRequest } from "next";
import { TABLES } from "../../../constants";
import { Wrapper } from "../../../helper";
import { IConnection, IScribble, IUser, modifyScribble } from "../../../types";

export default Wrapper(async (req: NextApiRequest) => {
  const access_token = req.headers.authorization as string;
  if (!access_token) {
    return { success: false, message: "No Token Present" };
  }
  const db = await getClientDb();
  const connInfo = (await db.collection(TABLES.connection).findOne({
    access_token: access_token,
    deleted: false,
  })) as unknown as IConnection | null;
  if (!connInfo) {
    return { success: false, message: "No Token Found" };
  }
  const createdDate = new Date(connInfo._createdOn).getTime();
  const currTime = new Date().getTime();

  const timesCreated = Number(((currTime - createdDate) / 1000).toFixed(0));
  const userInfo = (await db
    .collection(TABLES.user)
    // @ts-ignore
    .findOne({ _id: connInfo.userId })) as unknown as IUser | null;
  if (!userInfo || userInfo.deleted) {
    return {
      success: false,
      message: "User Not Found",
      isDeleted: !!userInfo?.deleted,
    };
  }

  if (timesCreated > (connInfo.duration || 3600)) {
    return {
      success: false,
      message: "Token Expired",
    };
  }

  const AllMessages = (await db
    .collection(TABLES.scribble)
    .find(
      {
        to: userInfo._id,
        deleted: false,
      },
      {
        sort: { _createdOn: -1, _id: -1 },
      }
    )
    .toArray()) as unknown as IScribble[] | [] | null;
  const modifiedMessages = AllMessages?.map(modifyScribble);
  return { success: true, messages: modifiedMessages };
});
