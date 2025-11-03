import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

const router = express.Router();

// Define all course CRUD routes
router.post("/", createCourse);        // Create course
router.get("/", getAllCourses);        // Get all courses
router.get("/:id", getCourseById);     // Get course by ID
router.put("/:id", updateCourse);      // Update course
router.delete("/:id", deleteCourse);   // Delete course

export default router;
