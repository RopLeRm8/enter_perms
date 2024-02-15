import { Request, Response } from "express";
import Car from "./models/cars";
import { ICars } from "@/types/api";
export default async function getcars(req: Request, res: Response) {
  try {
    const cars = await Car.findAll({
      attributes: ["english_cars", "hebrew_cars"],
    });
    const carsValues: ICars[] = cars.map((car) => car.dataValues);
    const engCars = carsValues.map((engCar) => engCar.english_cars);
    const hebCars = carsValues.map((hebCar) => hebCar.hebrew_cars);
    const carsRes = [...engCars, ...hebCars];
    res.status(200).json({ data: carsRes });
  } catch (err) {
    res.status(503).json({ error: "בעיה בהתחברות לשרת" });
  }
}