import { NextApiResponse, NextApiRequest } from "next";
import Entry from "../models/entry";

export default async function UpdateStatus(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id, isAccept, entryCode } = req.body;
    console.log(id, isAccept);
    if (!id) return res.status(503).json({ error: "No person ID" });
    await Entry.update(
      { ApproveStatus: isAccept ? "אושר" : "לא אושר", ApproveCode: entryCode },
      { where: { id: id } }
    );
    res.status(200).json({ data: id });
  } catch (err) {
    res
      .status(503)
      .json({ error: (err as object as { message: string }).message });
  }
}
