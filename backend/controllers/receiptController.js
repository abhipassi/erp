// import Receipt from "../models/receipt.js";
// import Admission from "../models/admission.js";
// import StudentFees from "../models/studentFees.js";
// import Course from "../models/course.js";
// import { Sequelize } from "sequelize";

// // Get next receipt number

// export const getNextReceiptNo = async (req, res) => {
//   try {
//     const maxReceipt = (await Receipt.max("ReceiptNo")) || 1000;
//     const nextReceipt = maxReceipt + 1;
//     res.status(200).json({ nextReceiptNo: nextReceipt });
//   } catch (error) {
//     console.error("Error fetching next receipt number:", error);
//     res.status(500).json({ message: "Failed to fetch next receipt number." });
//   }
// };

// // Get admission details for autofill in receipt
// export const getAdmissionDetails = async (req, res) => {
//   try {
//     const { admissionNo } = req.params;

//     const admission = await Admission.findOne({
//       where: { admissionNo },
//     });

//     if (!admission) {
//       return res.status(404).json({ message: "Admission not found." });
//     }

//     const studentFee = await StudentFees.findOne({
//       where: { studentId: admission.studentId },
//     });

//     const course = await Course.findOne({
//       where: { courseName: admission.courseApplied },
//     });

//     res.status(200).json({
//       admissionNo: admission.admissionNo,
//       studentName: admission.studentName,
//       address: admission.address,
//       course: course ? course.courseName : admission.courseApplied,
//       totalFees: studentFee ? studentFee.totalFees : 0,
//       pendingFees: studentFee ? studentFee.pendingFees : 0,
//     });
//   } catch (error) {
//     console.error("Error fetching admission details:", error);
//     res.status(500).json({ message: "Failed to fetch admission details." });
//   }
// };

// // Create new receipt
// export const createReceipt = async (req, res) => {
//   const {
//     admissionNo,
//     studentFeeId,
//     paymentDate,
//     amount,
//     mode,
//     particulars,
//     amountInWords,
//     authSignatory,
//   } = req.body;

//   try {
//     // Find admission using admissionNo
//     const admission = await Admission.findOne({ where: { admissionNo } });
//     if (!admission)
//       return res.status(404).json({ message: "Admission not found." });
//     const studentFee = await StudentFees.findOne({
//       where: { studentId: admission.studentId },
//     });
//     if (!studentFee)
//       return res.status(404).json({ message: "Student fee record not found." });

//     // Create receipt (hook handles CGST/UTGST/total)
//     const newReceipt = await Receipt.create({
//       studentFeeId,
//       studentId: admission.studentId,
//       admissionNo,
//       paymentDate,
//       amount,
//       mode,
//       particulars,
//       amountInWords,
//       authSignatory,
//     });

//     res.status(201).json({
//       message: "Receipt created successfully!",
//       receipt: newReceipt,
//     });
//   } catch (error) {
//     console.error("Error creating receipt:", error);
//     res.status(500).json({ message: "Failed to create receipt." });
//   }
// };

// // Get all receipts
// export const getAllReceipts = async (req, res) => {
//   try {
//     const receipts = await Receipt.findAll({
//       include: [
//         { model: Admission, attributes: ["admissionNo", "studentName"] },
//         {
//           model: StudentFees,
//           attributes: ["totalFees", "receivedFees", "pendingFees"],
//         },
//       ],
//       order: [["createdAt", "DESC"]],
//     });
//     res.status(200).json(receipts);
//   } catch (error) {
//     console.error("Error fetching receipts:", error);
//     res.status(500).json({ message: "Failed to fetch receipts." });
//   }
// };

// // Get single receipt by ID
// export const getReceiptById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const receipt = await Receipt.findByPk(id, {
//       include: [
//         { model: Admission, attributes: ["admissionNo", "studentName"] },
//         {
//           model: StudentFees,
//           attributes: ["totalFees", "receivedFees", "pendingFees"],
//         },
//       ],
//     });

//     if (!receipt)
//       return res.status(404).json({ message: "Receipt not found." });

//     res.status(200).json(receipt);
//   } catch (error) {
//     console.error("Error fetching receipt:", error);
//     res.status(500).json({ message: "Failed to fetch receipt." });
//   }
// };

// // Update receipt
// export const updateReceipt = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       paymentDate,
//       amount,
//       mode,
//       particulars,
//       amountInWords,
//       authSignatory,
//     } = req.body;

//     const receipt = await Receipt.findByPk(id);
//     if (!receipt)
//       return res.status(404).json({ message: "Receipt not found." });

//     // Update receipt details
//     receipt.paymentDate = paymentDate || receipt.paymentDate;
//     receipt.amount = amount || receipt.amount;
//     receipt.mode = mode || receipt.mode;
//     receipt.particulars = particulars || receipt.particulars;
//     receipt.amountInWords = amountInWords || receipt.amountInWords;
//     receipt.authSignatory = authSignatory || receipt.authSignatory;
//     // Recalculate GST and totals
//     receipt.CGST = parseFloat(receipt.amount) * 0.09;
//     receipt.UTGST = parseFloat(receipt.amount) * 0.09;
//     receipt.totalWithGST =
//       parseFloat(receipt.amount) +
//       parseFloat(receipt.CGST) +
//       parseFloat(receipt.UTGST);

//     await receipt.save();

//     res.status(200).json({
//       message: "Receipt updated successfully!",
//       updatedReceipt: receipt,
//     });
//   } catch (error) {
//     console.error("Error updating receipt:", error);
//     res.status(500).json({ message: "Failed to update receipt." });
//   }
// };

// // Delete receipt
// export const deleteReceipt = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const receipt = await Receipt.findByPk(id);

//     if (!receipt)
//       return res.status(404).json({ message: "Receipt not found." });

//     await receipt.destroy();

//     res.status(200).json({ message: "Receipt deleted successfully!" });
//   } catch (error) {
//     console.error("Error deleting receipt:", error);
//     res.status(500).json({ message: "Failed to delete receipt." });
//   }
// };
import { Sequelize } from "sequelize";
import sequelize from "../database/DB.js";
import Receipt from "../models/receipt.js";
import Admission from "../models/admission.js";
import StudentFees from "../models/studentFees.js";
import Course from "../models/course.js";

/**
 * @desc Get next receipt number
 */
export const getNextReceiptNo = async (req, res) => {
  try {
    const maxReceipt = (await Receipt.max("ReceiptNo")) || 1000;
    const nextReceipt = maxReceipt + 1;
    res.status(200).json({ nextReceiptNo: nextReceipt });
  } catch (error) {
    console.error("❌ Error fetching next receipt number:", error);
    res.status(500).json({ message: "Failed to fetch next receipt number." });
  }
};

/**
 * @desc Get admission details for autofilling receipt form
 */
export const getAdmissionDetails = async (req, res) => {
  try {
    const { admissionNo } = req.params;

    const admission = await Admission.findOne({ where: { admissionNo } });
    if (!admission) {
      return res.status(404).json({ message: "Admission not found." });
    }

    const studentFee = await StudentFees.findOne({
      where: { studentId: admission.studentId },
    });

    const course = await Course.findOne({
      where: { courseName: admission.courseApplied },
    });

    res.status(200).json({
      admissionNo: admission.admissionNo,
      studentName: admission.studentName,
      address: admission.address,
      course: course ? course.courseName : admission.courseApplied,
      totalFees: studentFee ? studentFee.totalFees : 0,
      pendingFees: studentFee ? studentFee.pendingFees : 0,
    });
  } catch (error) {
    console.error("❌ Error fetching admission details:", error);
    res.status(500).json({ message: "Failed to fetch admission details." });
  }
};

/**
 * @desc Create a new receipt (with transaction)
 */
export const createReceipt = async (req, res) => {
  const {
    admissionNo,
    studentFeeId,
    paymentDate,
    amount,
    mode,
    particulars,
    amountInWords,
    authSignatory,
  } = req.body;

  const t = await sequelize.transaction();

  try {
    // Validate admission record
    const admission = await Admission.findOne({ where: { admissionNo } });
    if (!admission)
      return res.status(404).json({ message: "Admission not found." });

    // Validate student fee record
    const studentFee = await StudentFees.findByPk(studentFeeId);
    if (!studentFee)
      return res.status(404).json({ message: "Student fee record not found." });

    // Create new receipt
    const newReceipt = await Receipt.create(
      {
        admissionNo,
        studentFeeId,
        paymentDate,
        amount,
        mode,
        particulars,
        amountInWords,
        authSignatory,
      },
      { transaction: t }
    );

    await t.commit();

    res.status(201).json({
      message: "✅ Receipt created successfully!",
      receipt: newReceipt,
    });
  } catch (error) {
    await t.rollback();
    console.error("❌ Error creating receipt:", error);
    res.status(500).json({ message: "Failed to create receipt." });
  }
};

/**
 * @desc Get all receipts
 */
export const getAllReceipts = async (req, res) => {
  try {
    const receipts = await Receipt.findAll({
      include: [
        {
          model: Admission,
          attributes: ["admissionNo", "studentName", "courseApplied"],
        },
        {
          model: StudentFees,
          attributes: ["totalFees", "receivedFees", "pendingFees"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(receipts);
  } catch (error) {
    console.error("❌ Error fetching receipts:", error);
    res.status(500).json({ message: "Failed to fetch receipts." });
  }
};

/**
 * @desc Get single receipt by ID
 */
export const getReceiptById = async (req, res) => {
  try {
    const { id } = req.params;

    const receipt = await Receipt.findByPk(id, {
      include: [
        {
          model: Admission,
          attributes: ["admissionNo", "studentName", "courseApplied"],
        },
        {
          model: StudentFees,
          attributes: ["totalFees", "receivedFees", "pendingFees"],
        },
      ],
    });

    if (!receipt)
      return res.status(404).json({ message: "Receipt not found." });

    res.status(200).json(receipt);
  } catch (error) {
    console.error("❌ Error fetching receipt:", error);
    res.status(500).json({ message: "Failed to fetch receipt." });
  }
};

/**
 * @desc Update receipt
 */
export const updateReceipt = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      paymentDate,
      amount,
      mode,
      particulars,
      amountInWords,
      authSignatory,
    } = req.body;

    const receipt = await Receipt.findByPk(id);
    if (!receipt)
      return res.status(404).json({ message: "Receipt not found." });

    // Update receipt fields
    Object.assign(receipt, {
      paymentDate: paymentDate || receipt.paymentDate,
      amount: amount || receipt.amount,
      mode: mode || receipt.mode,
      particulars: particulars || receipt.particulars,
      amountInWords: amountInWords || receipt.amountInWords,
      authSignatory: authSignatory || receipt.authSignatory,
    });

    await receipt.save();

    res.status(200).json({
      message: "✅ Receipt updated successfully!",
      updatedReceipt: receipt,
    });
  } catch (error) {
    console.error("❌ Error updating receipt:", error);
    res.status(500).json({ message: "Failed to update receipt." });
  }
};

/**
 * @desc Delete a receipt
 */
export const deleteReceipt = async (req, res) => {
  try {
    const { id } = req.params;

    const receipt = await Receipt.findByPk(id);
    if (!receipt)
      return res.status(404).json({ message: "Receipt not found." });

    await receipt.destroy();

    res.status(200).json({ message: "✅ Receipt deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting receipt:", error);
    res.status(500).json({ message: "Failed to delete receipt." });
  }
};
