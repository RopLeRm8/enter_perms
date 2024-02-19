import { NextApiRequest, NextApiResponse } from "next";
import Soldier from "../models/soldiers";

export default async function getsoldier(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const soldierId: { soldierId: string } = req.body;
    if (soldierId.soldierId.length < 7) return;
    const soldier = await Soldier.findOne({
      where: { id: soldierId.soldierId },
    });
    res.status(200).json({ data: soldier?.dataValues });
  } catch (err) {
    res.status(503).json({ error: "בעיה בהתחברות לשרת בסיס נתונים" });
  }
}
