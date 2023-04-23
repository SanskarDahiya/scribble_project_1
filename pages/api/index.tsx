import { NextApiRequest, NextApiResponse } from "next";
import getClient from "mongo-client";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const b = await getClient();
  res.status(200).end(JSON.stringify({ success: true, b: !!b }));
}
