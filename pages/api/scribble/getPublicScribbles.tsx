import { getPublicScribble } from "firebase-client";
import { NextApiRequest } from "next";
import { Wrapper } from "../../../helper";
import { IScribble, modifyScribble } from "../../../types";

export default Wrapper(async (req: NextApiRequest) => {
  const AllMessages = (await getPublicScribble()) as unknown as
    | IScribble[]
    | null;
  const modifiedMessages = AllMessages?.map(modifyScribble);
  return { success: true, messages: modifiedMessages };
});
