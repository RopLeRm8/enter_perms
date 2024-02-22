import Entry from "../models/entry";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GetTickets(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const tickets = await Entry.findAll();
    res.status(200).json(tickets);
  } catch (err) {
    res.status(503).json({ error: "קרתה בעיית התחברות לבסיס נתונים" });
  }
}
