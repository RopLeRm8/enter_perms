import { NextApiRequest, NextApiResponse } from "next";
import Entry from "../models/entry";
import { IGetTicket } from "@/types/api";

export default async function GetTicket(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { idNumber, isHayal }: IGetTicket = req.body;
    if (idNumber.length < (isHayal ? 7 : 9)) return;
    const previousTicket = await Entry.findOne({
      where: { IDPerson: idNumber },
    });
    const {
      id,
      createdAt,
      StartDate,
      EndDate,
      ApproveStatus,
      ApproveCode,
      CreatorUsername,
      ...usefulShit
    } = previousTicket?.dataValues ?? {};
    res.status(200).json({ data: usefulShit });
  } catch (err) {
    res.status(503).json({ error: "בעיה בהתחברות לשרת בסיס נתונים" });
  }
}
