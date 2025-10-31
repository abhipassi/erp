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

//     admissionId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: Admission,
//         key: "id",
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
//       type: DataTypes.STRING(255),
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
//     tableName: "receipt",
//     timestamps: true,

//     hooks: {
//       beforeCreate: async (receipt) => {
//         const maxReceipt = (await Receipt.max("ReceiptNo")) || 1000;
//         receipt.ReceiptNo = maxReceipt + 1;

//         receipt.CGST = parseFloat(receipt.amount) * 0.09;
//         receipt.UTGST = parseFloat(receipt.amount) * 0.09;
//         receipt.totalWithGST =
//           parseFloat(receipt.amount) +
//           parseFloat(receipt.CGST) +
//           parseFloat(receipt.UTGST);

//         const studentFee = await StudentFees.findByPk(receipt.studentFeeId);

//         if (studentFee) {
//           receipt.admissionId = studentFee.admissionId;

//           studentFee.receivedFees =
//             parseFloat(studentFee.receivedFees) + parseFloat(receipt.totalWithGST);

//           // Calculate pending fees
//           receipt.pendingFees = parseFloat(studentFee.totalFees) - parseFloat(studentFee.receivedFees);

//           await studentFee.save();
//         } else {
//           throw new Error("Invalid studentFeeId: no matching StudentFees record found.");
//         }
//       },
//     },
//   }
// );

// // 🔗 Associations
// StudentFees.hasMany(Receipt, { foreignKey: "studentFeeId" });
// Receipt.belongsTo(StudentFees, { foreignKey: "studentFeeId" });

// Admission.hasMany(Receipt, { foreignKey: "admissionId" });
// Receipt.belongsTo(Admission, { foreignKey: "admissionId" });

// export default Receipt;
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

