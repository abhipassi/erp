import admission from '../models/admission.js'

export const demo = (req, res) => {
    res.json("Working")
}

export const getStudentData = async (req, res) => {
    try {
        let data = await admission.findAll()
        console.log("Done");
        return res.status(200).json({ success: true, message: "Data Fetched", data: data })
        

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
        console.log(error);

    }
}