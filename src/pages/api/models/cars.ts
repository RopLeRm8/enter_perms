import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

class Car extends Model {}

Car.init(
  {
    english_cars: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hebrew_cars: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "car",
    tableName: "cars",
    timestamps: false,
  }
);

export default Car;
