import { NextApiRequest, NextApiResponse } from "next";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {

  res.status(200).end(JSON.stringify({ success: false, }));
}
