import { Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const sequelize = new Sequelize(process.env.DB_DBNAME as string, process.env.DB_USERNAME as string, process.env.DB_PASS, {
  host:process.env.DB_HOST,
  dialect: process.env.DB_DIALECT as Dialect, 
});

export default sequelize;
