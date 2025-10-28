import { DataTypes } from "sequelize";
import sequelize from "../database/DB.js";

const FeesMaster = sequelize.define(
  "FeesMaster",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    class: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },

    academicYear: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },

    totalFees: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    lumpsumFee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    gstIncluded: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "fees_master",
    timestamps: true,
  }
);

export default FeesMaster;
