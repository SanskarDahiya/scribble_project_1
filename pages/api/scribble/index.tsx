import {
  findScribbleByUserId,
  findTokenById,
  findUserById,
} from "mongo-client";
import { NextApiRequest } from "next";
import { Wrapper } from "../../../helper";
import { IConnection, IScribble, IUser, modifyScribble } from "../../../types";

export default Wrapper(async (req: NextApiRequest) => {
  const access_token = req.headers.authorization as string;
  if (!access_token) {
    return { success: false, message: "No Token Present" };
  }
  const connInfo = (await findTokenById(access_token, {
    deleted: false,
  })) as unknown as IConnection | null;
  if (!connInfo) {
    return { success: false, message: "No Token Found" };
  }
  const createdDate = new Date(connInfo._createdOn).getTime();
  const currTime = new Date().getTime();

  const timesCreated = Number(((currTime - createdDate) / 1000).toFixed(0));
  const userInfo = (await findUserById(
    connInfo.userId
  )) as unknown as IUser | null;
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

  const AllMessages = (await findScribbleByUserId(userInfo._id)) as unknown as
    | IScribble[]
    | []
    | null;
  const modifiedMessages = AllMessages?.map(modifyScribble);
  return { success: true, messages: modifiedMessages };
});
