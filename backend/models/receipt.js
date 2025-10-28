import { DataTypes } from "sequelize";
import sequelize from "../database/DB.js";
import StudentFees from "./studentFees.js";

const Receipt = sequelize.define(
  "Receipt",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    ReceiptNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },

    studentFeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: StudentFees,
        key: "id",
      },
    },

    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    CGST: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },

    UTGST: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },

    totalWithGST: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },

    mode: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    particulars: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    remarks: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "receipt",
    timestamps: true,

    hooks: {
      beforeCreate: async (receipt) => {
        // Auto-increment ReceiptNo
        const maxReceipt = (await Receipt.max("ReceiptNo")) || 1000;
        receipt.ReceiptNo = maxReceipt + 1;

        // Calculate GST (assuming 9% each for CGST & UTGST)
        receipt.CGST = parseFloat(receipt.amount) * 0.09;
        receipt.UTGST = parseFloat(receipt.amount) * 0.09;
        receipt.totalWithGST =
          parseFloat(receipt.amount) + parseFloat(receipt.CGST) + parseFloat(receipt.UTGST);

        // Update StudentFees
        const studentFee = await StudentFees.findByPk(receipt.studentFeeId);
        if (studentFee) {
          studentFee.receivedFees =
            parseFloat(studentFee.receivedFees) + parseFloat(receipt.totalWithGST);

          // pendingFees and paymentStatus will auto-update due to StudentFees hooks
          await studentFee.save();
        }
      },
    },
  }
);

// Associations
StudentFees.hasMany(Receipt, { foreignKey: "studentFeeId" });
Receipt.belongsTo(StudentFees, { foreignKey: "studentFeeId" });

export default Receipt;
