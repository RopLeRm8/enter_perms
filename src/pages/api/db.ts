import { Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize("entrydetail" as string, "root" as string, "", {
  host: "localhost",
  dialect: "mysql" as Dialect,
});

export default sequelize;
