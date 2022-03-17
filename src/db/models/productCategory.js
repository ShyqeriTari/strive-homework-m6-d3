import sequelize from "../index.js";
import { DataTypes } from "sequelize";

const productCategory = sequelize.define(
  "productCategory",
  {

  },
  {
    timestamps: false,
  }
);

export default productCategory;