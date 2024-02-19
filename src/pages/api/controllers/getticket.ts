import { NextApiRequest, NextApiResponse } from "next";
import Entry from "../models/entry";

export default async function GetTicket(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { idNumber, isHayal }: { idNumber: string; isHayal: boolean } =
      req.body;
    console.log(idNumber, isHayal);
    if (idNumber.length < (isHayal ? 7 : 9)) return;
    const previousTicket = await Entry.findOne({
      where: { IDPerson: idNumber },
    });
    console.log(previousTicket);
    const {
      id,
      createdAt,
      StartDate,
      EndDate,
      ApproveStatus,
      ApproveCode,
      ...usefulShit
    } = previousTicket?.dataValues ?? {};
    res.status(200).json({ data: usefulShit });
  } catch (err) {
    res.status(503).json({ error: "בעיה בהתחברות לשרת בסיס נתונים" });
  }
}
