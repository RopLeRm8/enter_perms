import { NextApiRequest, NextApiResponse } from "next";
import Entry from "../models/entry";
import { ISaveTicketData } from "@/types/api";
import os from "os";

const DEFAULTAPPROVE = "בטיפול";

export default async function saveticket(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data: ISaveTicketData = req.body;
    const osUserName = os.userInfo().username;

    await Entry.create({
      ...data.dbData,
      ApproveStatus: DEFAULTAPPROVE,
      CreatorUsername: osUserName,
    });
    data.nilvim.map(async (nilve) => {
      await Entry.create({
        ...nilve,
        ApproveStatus: DEFAULTAPPROVE,
        CreatorUsername: osUserName,
      });
    });
    res.status(200).json({ data: "good" });
  } catch (err) {
    res.status(503).json({ error: "בעיה בהתחברות לבסיס נתונים" });
  }
}
