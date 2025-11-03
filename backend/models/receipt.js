 import { DataTypes } from "sequelize";
import sequelize from "../database/DB.js";
import StudentFees from "./studentFees.js";
import Admission from "./admission.js";

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

    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Admission,
        key: "studentId",
      },
    },

    admissionNo: {
      type: DataTypes.STRING(50),
      allowNull: true, // will be auto-filled from Admission
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

    pendingFees: {
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

    amountInWords: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    authSignatory: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "receipt",
    timestamps: true,

    hooks: {
      beforeCreate: async (receipt) => {
        // Generate receipt number
        const maxReceipt = (await Receipt.max("ReceiptNo")) || 1000;
        receipt.ReceiptNo = maxReceipt + 1;

        // Calculate taxes
        receipt.CGST = parseFloat(receipt.amount) * 0.09;
        receipt.UTGST = parseFloat(receipt.amount) * 0.09;
        receipt.totalWithGST =
          parseFloat(receipt.amount) +
          parseFloat(receipt.CGST) +
          parseFloat(receipt.UTGST);

        // Fetch related StudentFee
        const studentFee = await StudentFees.findByPk(receipt.studentFeeId);
        if (!studentFee) throw new Error("Invalid studentFeeId.");

        receipt.studentId = studentFee.studentId;

        // Fetch admission details to get admissionNo
        const admission = await Admission.findOne({
          where: { studentId: studentFee.studentId },
        });
        if (admission) {
          receipt.admissionNo = admission.admissionNo;
        }

        // Update StudentFees
        studentFee.receivedFees =
          parseFloat(studentFee.receivedFees) + parseFloat(receipt.totalWithGST);

        receipt.pendingFees =
          parseFloat(studentFee.totalFees) - parseFloat(studentFee.receivedFees);

        await studentFee.save();
      },
    },
  }
);

// 🔗 Associations
StudentFees.hasMany(Receipt, { foreignKey: "studentFeeId" });
Receipt.belongsTo(StudentFees, { foreignKey: "studentFeeId" });

Admission.hasMany(Receipt, { foreignKey: "studentId" });
Receipt.belongsTo(Admission, { foreignKey: "studentId" });

export default Receipt;
// import { DataTypes } from "sequelize";
// import sequelize from "../database/DB.js";
// import StudentFees from "./studentFees.js";
// import Admission from "./admission.js";

// const Receipt = sequelize.define(
//   "Receipt",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },

//     ReceiptNo: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       unique: true,
//     },

//     admissionNo: {
//       type: DataTypes.STRING(50),
//       allowNull: false,
//       references: {
//         model: Admission,
//         key: "admissionNo",
//       },
//     },

//     studentFeeId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: StudentFees,
//         key: "id",
//       },
//     },

//     paymentDate: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },

//     amount: {
//       type: DataTypes.DECIMAL(10, 2),
//       allowNull: false,
//     },

//     CGST: {
//       type: DataTypes.DECIMAL(10, 2),
//       allowNull: false,
//       defaultValue: 0.0,
//     },

//     UTGST: {
//       type: DataTypes.DECIMAL(10, 2),
//       allowNull: false,
//       defaultValue: 0.0,
//     },

//     totalWithGST: {
//       type: DataTypes.DECIMAL(10, 2),
//       allowNull: false,
//       defaultValue: 0.0,
//     },

//     pendingFees: {
//       type: DataTypes.DECIMAL(10, 2),
//       allowNull: false,
//       defaultValue: 0.0,
//     },

//     mode: {
//       type: DataTypes.STRING(100),
//       allowNull: false,
//     },

//     particulars: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },

//     amountInWords: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },

//     authSignatory: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//   },
//   {
//     tableName: "receipts",
//     timestamps: true,

//     hooks: {
//       /**
//        * Automatically calculates GST, total, and pending fees before creating a receipt.
//        * Also assigns sequential ReceiptNo.
//        */
//       beforeCreate: async (receipt, options) => {
//         // Generate next receipt number
//         const maxReceipt = (await Receipt.max("ReceiptNo")) || 1000;
//         receipt.ReceiptNo = maxReceipt + 1;

//         // Calculate GST and total
//         const amount = parseFloat(receipt.amount);
//         receipt.CGST = +(amount * 0.09).toFixed(2);
//         receipt.UTGST = +(amount * 0.09).toFixed(2);
//         receipt.totalWithGST = +(amount + receipt.CGST + receipt.UTGST).toFixed(2);

//         // Find related StudentFees
//         const studentFee = await StudentFees.findByPk(receipt.studentFeeId);
//         if (!studentFee) throw new Error("Invalid studentFeeId: record not found.");

//         // Validate Admission based on admissionNo
//         const admission = await Admission.findOne({
//           where: { admissionNo: receipt.admissionNo },
//         });
//         if (!admission) throw new Error("Invalid admissionNo: record not found.");

//         // Update StudentFees totals
//         const updatedReceived = parseFloat(studentFee.receivedFees) + receipt.totalWithGST;
//         const pending = parseFloat(studentFee.totalFees) - updatedReceived;

//         studentFee.receivedFees = +(updatedReceived).toFixed(2);
//         studentFee.pendingFees = +(pending).toFixed(2);
//         await studentFee.save({ transaction: options?.transaction });

//         receipt.pendingFees = studentFee.pendingFees;
//       },

//       /**
//        * Automatically recalculates GST and totals before updating a receipt.
//        */
//       beforeUpdate: async (receipt) => {
//         const amount = parseFloat(receipt.amount);
//         receipt.CGST = +(amount * 0.09).toFixed(2);
//         receipt.UTGST = +(amount * 0.09).toFixed(2);
//         receipt.totalWithGST = +(amount + receipt.CGST + receipt.UTGST).toFixed(2);
//       },
//     },
//   }
// );

// // 🔗 Associations
// StudentFees.hasMany(Receipt, { foreignKey: "studentFeeId" });
// Receipt.belongsTo(StudentFees, { foreignKey: "studentFeeId" });
// Admission.hasMany(Receipt, { foreignKey: "admissionNo", sourceKey: "admissionNo" });
// Receipt.belongsTo(Admission, { foreignKey: "admissionNo", targetKey: "admissionNo" });

// export default Receipt;

