
import { DataTypes } from "sequelize";
import sequelize from "../database/DB.js";
import Admission from "./admission.js";
import FeesMaster from "./feesMaster.js";

const StudentFees = sequelize.define(
  "StudentFees",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Admission,
        key: "studentId",
      },
    },

    feesMasterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: FeesMaster,
        key: "id",
      },
    },

    totalFees: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    receivedFees: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },

    refundedFees: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },

    pendingFees: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },

    paymentStatus: {
      type: DataTypes.ENUM("Pending", "Partial", "Paid"),
      defaultValue: "Pending",
    },

    lastPaymentDate: {
      type: DataTypes.DATE,
    },

    remarks: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "student_fees",
    timestamps: true,

    hooks: {
      beforeCreate: (studentFee) => {
        studentFee.pendingFees =
          parseFloat(studentFee.totalFees) -
          parseFloat(studentFee.receivedFees) +
          parseFloat(studentFee.refundedFees);

        if (studentFee.pendingFees <= 0) {
          studentFee.paymentStatus = "Paid";
          studentFee.pendingFees = 0;
        } else if (
          studentFee.receivedFees > 0 &&
          studentFee.pendingFees > 0
        ) {
          studentFee.paymentStatus = "Partial";
        } else {
          studentFee.paymentStatus = "Pending";
        }
      },

      beforeUpdate: (studentFee) => {
        studentFee.pendingFees =
          parseFloat(studentFee.totalFees) -
          parseFloat(studentFee.receivedFees) +
          parseFloat(studentFee.refundedFees);

        if (studentFee.pendingFees <= 0) {
          studentFee.paymentStatus = "Paid";
          studentFee.pendingFees = 0;
        } else if (
          studentFee.receivedFees > 0 &&
          studentFee.pendingFees > 0
        ) {
          studentFee.paymentStatus = "Partial";
        } else {
          studentFee.paymentStatus = "Pending";
        }
      },
    },
  }
);

// Associations
Admission.hasMany(StudentFees, { foreignKey: "studentId" });
StudentFees.belongsTo(Admission, { foreignKey: "studentId" });

FeesMaster.hasMany(StudentFees, { foreignKey: "feesMasterId" });
StudentFees.belongsTo(FeesMaster, { foreignKey: "feesMasterId" });

export default StudentFees;
