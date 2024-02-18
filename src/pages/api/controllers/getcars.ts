import { NextApiRequest, NextApiResponse } from "next";
import Car from "../models/cars";
import { ICars } from "@/types/api";

export default async function getcars(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const cars = await Car.findAll({
      attributes: ["english_cars", "hebrew_cars"],
    });
    const carsRes: ICars[] = cars.map((car) => ({
      englishName: car.dataValues.english_cars,
      hebrewName: car.dataValues.hebrew_cars,
    }));
    res.status(200).json({ data: carsRes });
  } catch (err) {
    res.status(503).json({ error: "בעיה בהתחברות לשרת בסיס נתונים" });
  }
}
