import { DataTypes } from "sequelize";
import sequelize from "../database/DB.js";
import FeesMaster from "./feesMaster.js";

const FeeInstallments = sequelize.define(
  "FeeInstallments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // feesMasterId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: FeesMaster,
    //     key: "id",
    //   },
    // },

    installmentNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "fee_installments",
    timestamps: true,
  }
);

// Associations
FeesMaster.hasMany(FeeInstallments, { foreignKey: "feesMasterId" });
FeeInstallments.belongsTo(FeesMaster, { foreignKey: "feesMasterId" });

export default FeeInstallments;
