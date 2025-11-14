import Admission from "../models/admission.js";

// Demo route
export const demo = (req, res) => {
  res.json("Student Routes Working");
};

// Generate next admission number (utility function)
export const admissionNumber = async () => {
  try {
    // Find the latest admission based on admissionNo
    const lastAdmission = await Admission.findOne({
      order: [["admissionNo", "DESC"]],
    });

    let nextNumber = 1;
    if (lastAdmission && lastAdmission.admissionNo) {
      // Extract numeric part and increment
      const lastNumber = parseInt(lastAdmission.admissionNo.replace("ADM", ""), 10);
      nextNumber = lastNumber + 1;
    }

    // Format admission number as ADM0001, ADM0002, etc.
    const formattedNumber = `ADM${nextNumber.toString().padStart(4, "0")}`;
    return formattedNumber;
  } catch (error) {
    console.error("Error generating admission number:", error);
    throw new Error("Unable to generate admission number");
  }
};

// File upload handler
export const uploadFile = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded!" });
    }

    res.status(200).json({
      message: "File uploaded successfully!",
      file: req.file,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create new admission
export const newAdmission = async (req, res) => {
  try {
    const {
      courseApplied,
      studentName,
      fatherName,
      motherName,
      dob,
      address,
      city,
      state,
      pinCode,
      schoolName,
      schoolCity,
      fatherOccupation,
      fatherAddress,
      studentEmail,
      parentContact,
      studentContact,
    } = req.body;

    const image = req.file ? req.file.filename : null;

    // Generate admission number
    const admissionNo = await admissionNumber();

    // Save admission record
    const response = await Admission.create({
      admissionNo,
      courseApplied,
      studentName,
      fatherName,
      motherName,
      dob,
      address,
      city,
      state,
      pinCode,
      schoolName,
      schoolCity,
      fatherOccupation,
      fatherAddress,
      studentEmail,
      parentContact,
      studentContact,
      image,
    });

    res.status(201).json({
      success: true,
      message: "New admission added successfully!",
      data: response,
    });

    console.log("New admission added:", response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// import Admission from "../models/admission.js";
// import Course from "../models/course.js";
// import { Op } from "sequelize";

// //  Create new admission
// export const createAdmission = async (req, res) => {
//   try {
//     const {
//       courseApplied,
//       studentName,
//       fatherName,
//       motherName,
//       dob,
//       address,
//       city,
//       state,
//       pinCode,
//       schoolName,
//       schoolCity,
//       fatherOccupation,
//       studentEmail,
//       parentContact,
//       studentContact,
//       fatherAddress,
//     } = req.body;

//     //  Validation
//     if (
//       !courseApplied ||
//       !studentName ||
//       !fatherName ||
//       !motherName ||
//       !dob ||
//       !address ||
//       !city ||
//       !state ||
//       !pinCode ||
//       !schoolName ||
//       !schoolCity ||
//       !fatherOccupation ||
//       !studentEmail ||
//       !parentContact ||
//       !studentContact ||
//       !fatherAddress
//     ) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     //  Check if course exists
//     const selectedCourse = await Course.findOne({
//       where: { courseName: courseApplied },
//     });

//     if (!selectedCourse) {
//       return res.status(404).json({ message: "Selected course not found." });
//     }

//     // Image handling
//     const image = req.file ? req.file.filename : null;

//     //  Create new admission
//     const newAdmission = await Admission.create({
//       courseApplied,
//       studentName,
//       fatherName,
//       motherName,
//       dob,
//       address,
//       city,
//       state,
//       pinCode,
//       schoolName,
//       schoolCity,
//       fatherOccupation,
//       studentEmail,
//       parentContact,
//       studentContact,
//       fatherAddress,
//       image,
//     });

//     //  Include course details in response
//     res.status(201).json({
//       message: "Admission created successfully.",
//       admission: newAdmission,
//       courseDetails: selectedCourse,
//     });
//   } catch (error) {
//     console.error(" Error creating admission:", error);
//     res.status(500).json({ message: "Failed to create admission." });
//   }
// };

// //  Get all admissions
// export const getAllAdmissions = async (req, res) => {
//   try {
//     const admissions = await Admission.findAll({
//       order: [["created_at", "DESC"]],
//     });
//     res.status(200).json(admissions);
//   } catch (error) {
//     console.error(" Error fetching admissions:", error);
//     res.status(500).json({ message: "Failed to fetch admissions." });
//   }
// };

// //  Get admission by ID
// export const getAdmissionById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const admission = await Admission.findByPk(id);

//     if (!admission) {
//       return res.status(404).json({ message: "Admission not found." });
//     }

//     res.status(200).json(admission);
//   } catch (error) {
//     console.error(" Error fetching admission:", error);
//     res.status(500).json({ message: "Failed to fetch admission." });
//   }
// };
