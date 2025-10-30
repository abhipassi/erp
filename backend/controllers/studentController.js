import admission from '../models/admission.js'
export const demo = (req, res) => {
    res.json("Student Routes Working")
}

export const admissionNumber = () => {
    
}

export const uploadFile = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded!" });
        }

        // You can access req.file for file info, and save file data to DB if needed
        res.status(200).json({
            message: "File uploaded successfully!",
            file: req.file
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

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

        const response = await admission.create({
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

        res.status(201).json({ success: true, response });
        console.log("New admission added:", response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
