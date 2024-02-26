import { NextApiResponse, NextApiRequest } from "next";
import Entry from "../models/entry";

export default async function UpdateStatus(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { personId, isAccept } = req.body;
    console.log(personId, isAccept);
    if (!personId) return res.status(503).json({ error: "No person ID" });
    await Entry.update(
      { ApproveStatus: isAccept ? "אושר" : "לא אושר" },
      { where: { IDPerson: personId } }
    );
    res.status(200).json({ data: personId });
  } catch (err) {
    res
      .status(503)
      .json({ error: (err as object as { message: string }).message });
  }
}
