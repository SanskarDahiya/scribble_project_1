import { getClientDb } from "mongo-client";
import { NextApiRequest } from "next";
import { TABLES } from "../../../constants";
import { Wrapper } from "../../../helper";
import { IScribble, modifyScribble } from "../../../types";

export default Wrapper(async (req: NextApiRequest) => {
  const db = await getClientDb();
  const AllMessages = (await db
    .collection(TABLES.scribble)
    .find(
      {
        $or: [
          {
            isPublic: true,
            deleted: false,
          },
        ],
      },
      { sort: { _createdOn: -1, _id: -1 } }
    )
    .toArray()) as unknown as IScribble[] | [] | null;
  const modifiedMessages = AllMessages?.map(modifyScribble);
  return { success: true, messages: modifiedMessages };
});
