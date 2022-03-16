
import sequelize from "../index.js";
import { DataTypes } from "sequelize";

const review = sequelize.define(
  "review",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
  },
  {
    timestamps: false,
  }
);

export default review;