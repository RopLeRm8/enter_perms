import { Request, Response } from "express";
import Entry from "../models/entry";

export default async function saveticket(req: Request, res: Response) {
  try {
    const data = req.body;
    await Entry.create({ ...data.dbData, ApproveStatus: "ממתין לאישור" });
    res.status(200).json({ data: "good" });
  } catch (err) {
    res.status(500).json({ error: "בעיה בהתחברות לבסיס נתונים" });
  }
}
