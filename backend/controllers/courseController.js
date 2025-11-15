import Course from "../models/course.js";

//  Create Course
export const createCourse = async (req, res) => {
  try {
    // const { courseName, courseFees, courseDuration, courseType } = req.body;
    const { courseName, courseFees, courseDuration, courseType, installment } = req.body;


    if (!courseName || !courseFees || !courseDuration || !courseType) {
      return res.status(400).json({ message: "All fields are required." });
    }

     const newCourse = 
    // await Course.create({
    //   courseName,
    //   courseFees,
    //   courseDuration,
    //   courseType,
    // });
    await Course.create({ courseName, courseFees, courseDuration, courseType, installment });


    res.status(201).json({
      message: "Course added successfully.",
      course: newCourse,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Failed to create course." });
  }
};

// Get All Courses

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Failed to fetch courses." });
  }
};


//  Get Single Course by ID

export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ message: "Failed to fetch course." });
  }
};


//  Update Course

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { courseName, courseFees, courseDuration, courseType } = req.body;

    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    // await course.update({courseName, courseFees, courseDuration, courseType,});
    await course.update({ courseName, courseFees, courseDuration, courseType, installment });


    res.status(200).json({
      message: "Course updated successfully.",
      updatedCourse: course,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Failed to update course." });
  }
};


//  Delete Course
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }
    await course.destroy();
    res.status(200).json({ message: "Course deleted successfully." });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Failed to delete course." });
  }
};
