import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

class Soldier extends Model {}

Soldier.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "soldier",
    tableName: "soldiers",
    timestamps: false,
  }
);

export default Soldier;
