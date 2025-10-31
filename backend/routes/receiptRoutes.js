import express from "express";
import {
  getNextReceiptNo,
  getAdmissionDetails,
  createReceipt,
  getAllReceipts,
  getReceiptById,
  updateReceipt,
  deleteReceipt,
} from "../controllers/receiptController.js";

const router = express.Router();

router.get("/next-number", getNextReceiptNo);
router.get("/admission/:admissionNo", getAdmissionDetails);
router.post("/", createReceipt);
router.get("/", getAllReceipts);
router.get("/:id", getReceiptById);
router.put("/:id", updateReceipt);
router.delete("/:id", deleteReceipt);

export default router;
