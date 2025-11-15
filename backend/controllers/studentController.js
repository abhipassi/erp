// import admission from '../models/admission.js'
// export const demo = (req, res) => {
//     res.json("Student Routes Working")
// }

// export const admissionNumber = () => {
    
// }

// export const uploadFile = (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ error: "No file uploaded!" });
//         }

//         // You can access req.file for file info, and save file data to DB if needed
//         res.status(200).json({
//             message: "File uploaded successfully!",
//             file: req.file
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };

// export const newAdmission = async (req, res) => {
//     try {
//         const {     
//             courseApplied,
//             studentName,
//             fatherName,
//             motherName,
//             dob,
//             address,
//             city,
//             state,
//             pinCode,
//             schoolName,
//             schoolCity,
//             fatherOccupation,
//             fatherAddress,
//             studentEmail,
//             parentContact,
//             studentContact,
//         } = req.body;


//         const image = req.file ? req.file.filename : null;

//         const response = await admission.create({
//             courseApplied,
//             studentName,
//             fatherName,
//             motherName,
//             dob,
//             address,
//             city,
//             state,
//             pinCode,
//             schoolName,
//             schoolCity,
//             fatherOccupation,
//             fatherAddress,
//             studentEmail,
//             parentContact,
//             studentContact,
//             image,
//         });

//         res.status(201).json({ success: true, response });
//         console.log("New admission added:", response);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Server error" });
//     }
// };
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
