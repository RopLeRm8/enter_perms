import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

class Entry extends Model {}

Entry.init(
  {
    IDPerson: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    HumenType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IndustryType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ID_Guarantor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ClassifiedType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    StartDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    EndDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    WorkArea: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    HaveCar: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    CarNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CarColor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CarManufacture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ApproveStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ApproveCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "entry",
    tableName: "soldiersentry",
  }
);

export default Entry;
