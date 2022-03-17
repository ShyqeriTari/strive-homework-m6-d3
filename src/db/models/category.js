import sequelize from "../index.js";
import { DataTypes } from "sequelize";

const category = sequelize.define("category", 
{
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default category;