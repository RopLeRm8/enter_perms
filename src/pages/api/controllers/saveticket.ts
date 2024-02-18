import { NextApiRequest, NextApiResponse } from "next";
import Entry from "../models/entry";
import { ISaveTicketData } from "@/types/api";

const DEFAULTAPPROVE = "ממתין לאישור";

export default async function saveticket(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data: ISaveTicketData = req.body;
    await Entry.create({ ...data.dbData, ApproveStatus: DEFAULTAPPROVE });
    data.nilvim.map(async (nilve) => {
      await Entry.create({ ...nilve, ApproveStatus: DEFAULTAPPROVE });
    });
    res.status(200).json({ data: "good" });
  } catch (err) {
    res.status(503).json({ error: "בעיה בהתחברות לבסיס נתונים" });
  }
}
