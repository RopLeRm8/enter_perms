import { Request, Response } from "express";
import Car from "./models/cars";
import { ICars } from "@/types/api";

export default async function getcars(req: Request, res: Response) {
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
