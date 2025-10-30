import React, { useState } from 'react';
import axios from 'axios';

function Admission() {
    const [courseApplied, setCourseApplied] = useState("");
    const [studentName, setStudentName] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [motherName, setMotherName] = useState("");
    const [dob, setDob] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [schoolName, setSchoolName] = useState("");
    const [schoolCity, setSchoolCityName] = useState("");
    const [fatherOccupation, setFatherOccupation] = useState("");
    const [studentEmail, setStudentEmail] = useState("");
    const [parentContact, setParentContact] = useState("");
    const [studentContact, setStudentContact] = useState("");
    const [fatherAddress, setFatherAddress] = useState("");
    const [image, setImage] = useState(null);

    let inputFieldClear = () => {
        setCourseApplied("");
        setStudentName("");
        setFatherName("");
        setMotherName("");
        setDob("");
        setAddress("");
        setCity("");
        setState("");
        setPinCode("");
        setSchoolName("");
        setSchoolCityName("");
        setFatherOccupation("");
        setStudentEmail("");
        setParentContact("");
        setStudentContact("");
        setFatherAddress("");
        setImage(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("courseApplied", courseApplied);
            data.append("studentName", studentName);
            data.append("fatherName", fatherName);
            data.append("motherName", motherName);
            data.append("dob", dob);
            data.append("address", address);
            data.append("city", city);
            data.append("state", state);
            data.append("pinCode", pinCode);
            data.append("schoolCity", schoolCity);
            data.append("schoolName", schoolName);
            data.append("fatherOccupation", fatherOccupation);
            data.append("studentEmail", studentEmail);
            data.append("parentContact", parentContact);
            data.append("studentContact", studentContact);
            data.append("image", image);
            data.append("fatherAddress", fatherAddress);

            const response = await axios.post("http://localhost:3000/api/student/admission", data);
            console.log(response);
            if (response.status === 201) {
                alert("Form submitted successfully!")
                inputFieldClear()
                e.target.reset();
            }
        } catch (error) {
            console.log(error);
            alert("Error submitting form!");
        }
    };

    return (
        <div className="container-fluid p-4" style={{ backgroundColor: "#f8f9fc", minHeight: "100vh" }}>
            <div className="card shadow border-0 rounded-4 p-4">
                <h3 className="fw-bold mb-4 text-primary">🎓 Student Admission Form</h3>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="row g-4">
                        <div className="col-md-4">
                            <label className="form-label">Student Name</label>
                            <input type="text" className="form-control" value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Father Name</label>
                            <input type="text" className="form-control " value={fatherName} onChange={(e) => setFatherName(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Mother Name</label>
                            <input type="text" className="form-control" value={motherName} onChange={(e) => setMotherName(e.target.value)} />
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Date of Birth</label>
                            <input type="date" className="form-control" value={dob} onChange={(e) => setDob(e.target.value)} />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Course Applied</label>
                            <input type="text" className="form-control" value={courseApplied} onChange={(e) => setCourseApplied(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Address</label>
                            <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">City</label>
                            <input type="text" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">State</label>
                            <input type="text" className="form-control" value={state} onChange={(e) => setState(e.target.value)} />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Pin Code</label>
                            <input type="text" className="form-control" value={pinCode} onChange={(e) => setPinCode(e.target.value)} />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Father Occupation</label>
                            <input type="text" className="form-control" value={fatherOccupation} onChange={(e) => setFatherOccupation(e.target.value)} />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Student Email</label>
                            <input type="email" className="form-control" value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Parent Contact</label>
                            <input type="text" className="form-control" value={parentContact} onChange={(e) => setParentContact(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Student Contact</label>
                            <input type="text" className="form-control" value={studentContact} onChange={(e) => setStudentContact(e.target.value)} />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">School Name</label>
                            <input type="text" className="form-control" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">School City</label>
                            <input type="text" className="form-control" value={schoolCity} onChange={(e) => setSchoolCityName(e.target.value)} />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Father Address</label>
                            <input type="text" className="form-control" value={fatherAddress} onChange={(e) => setFatherAddress(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Student Image</label>
                            <input type="file" className="form-control" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                        </div>
                    </div>

                    <div className="text-end mt-4">
                        <button type="submit" className="btn btn-primary px-4 py-2 rounded-3 shadow-sm">
                            Submit Form
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Admission;
