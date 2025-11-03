/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ManageStudents() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Fetch students from API
    useEffect(() => {
        const getStudentData = async () => {
            try {
                let response = await axios.get("http://localhost:3000/api/admin/getStudentData");
                setStudents(response.data?.data || []);
            } catch (error) {
                alert("Something went wrong");
                console.log(error);
            }
        };
        getStudentData();
    }, []);

    // Delete handler (you can later connect it to API)
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            setStudents(students.filter((student) => student.studentId !== id));
        }
    };

    // Open modal and set selected student
    const handleViewDetails = (student) => {
        setSelectedStudent(student);
        setShowModal(true);
        setIsEditing(false);
    };

    // Update editable fields
    const handleChange = (e) => {
        setSelectedStudent({
            ...selectedStudent,
            [e.target.name]: e.target.value,
        });
    };

    // Save updates (later you can send a PUT request here)
    const handleSave = () => {
        setIsEditing(false);
        alert("Student details updated successfully! (implement API call here)");
    };

    return (
        <div
            className="container-fluid p-4"
            style={{ backgroundColor: "#f8f9fc", minHeight: "100vh" }}
        >
            <div
                className="card shadow border-0 rounded-4 p-4 mx-auto"
                style={{ maxWidth: "1100px" }}
            >
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="fw-bold text-primary mb-0">🎓 Manage Students</h3>
                    <button
                        className="btn btn-primary rounded-3 shadow-sm px-4"
                        onClick={() => navigate("/admission")}
                    >
                        + Add Student
                    </button>
                </div>

                {/* Search Bar */}
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control rounded-3 shadow-sm"
                        placeholder="Search by name or email..."
                    />
                </div>

                {/* Table */}
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="table-primary text-center">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Course</th>
                                <th>City</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {students.map((student) => (
                                <tr key={student.studentId}>
                                    <td>{student.studentId}</td>
                                    <td>{student.studentName}</td>
                                    <td>{student.studentEmail}</td>
                                    <td>{student.courseApplied}</td>
                                    <td>{student.city}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline-info rounded-3 me-2"
                                            onClick={() => handleViewDetails(student)}
                                        >
                                            View
                                        </button>
                                        {/* <button
                                            className="btn btn-sm btn-outline-danger rounded-3 me-2"
                                            onClick={() => handleDelete(student.studentId)}
                                        >
                                            Delete
                                        </button>
                                        <button className="btn btn-sm btn-outline-primary rounded-3">
                                            Edit
                                        </button> */}
                                    </td>
                                </tr>
                            ))}
                            {students.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-muted">
                                        No students found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}

            {showModal && selectedStudent && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog modal-xl modal-dialog-centered">
                        <div className="modal-content rounded-4 shadow-lg border-0">
                            {/* Modal Header */}
                            <div className="modal-header bg-primary text-white d-flex justify-content-between align-items-center">
                                <h5 className="modal-title">
                                    🎓 Student Profile - {selectedStudent.studentName}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close bg-white"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>

                            {/* Modal Body */}
                            <div className="modal-body p-4">
                                {/* Bootstrap Tabs */}
                                <ul className="nav nav-tabs mb-4" id="studentTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link active"
                                            id="profile-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#profile"
                                            type="button"
                                            role="tab"
                                        >
                                            Profile
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="fees-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#fees"
                                            type="button"
                                            role="tab"
                                        >
                                            Fees
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="attendance-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#attendance"
                                            type="button"
                                            role="tab"
                                        >
                                            Attendance
                                        </button>
                                    </li>
                                </ul>

                                <div className="tab-content" id="studentTabContent">
                                    {/* PROFILE TAB */}
                                    <div
                                        className="tab-pane fade show active"
                                        id="profile"
                                        role="tabpanel"
                                    >
                                        <div className="row g-4">
                                            {/* Profile Image Section */}
                                            <div className="col-md-4 text-center border-end">
                                                <img
                                                    src={`http://localhost:3000/uploads/${selectedStudent.image}`}
                                                    alt={selectedStudent.studentName}
                                                    className="img-fluid rounded-circle shadow mb-3"
                                                    style={{
                                                        width: "150px",
                                                        height: "150px",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                                <h5 className="text-primary fw-bold">
                                                    {selectedStudent.studentName}
                                                </h5>
                                                <p className="text-muted mb-1">
                                                    {selectedStudent.courseApplied}
                                                </p>
                                                <p className="text-muted mb-3">
                                                    {selectedStudent.studentEmail}
                                                </p>

                                                <div>
                                                    {!isEditing ? (
                                                        <button
                                                            className="btn btn-warning me-2"
                                                            onClick={() => setIsEditing(true)}
                                                        >
                                                            ✏️ Edit
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="btn btn-success me-2"
                                                            onClick={handleSave}
                                                        >
                                                            💾 Save
                                                        </button>
                                                    )}
                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        onClick={() => setShowModal(false)}
                                                    >
                                                        Close
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Student Info Section */}
                                            <div className="col-md-8">
                                                <div className="row g-3">
                                                    <h6 className="fw-bold text-secondary mb-2">
                                                        Personal Information
                                                    </h6>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Father Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="fatherName"
                                                            value={selectedStudent.fatherName}
                                                            onChange={handleChange}
                                                            readOnly={!isEditing}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Mother Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="motherName"
                                                            value={selectedStudent.motherName}
                                                            onChange={handleChange}
                                                            readOnly={!isEditing}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Date of Birth</label>
                                                        <input
                                                            type="date"
                                                            className="form-control"
                                                            name="dob"
                                                            value={selectedStudent.dob?.split("T")[0]}
                                                            onChange={handleChange}
                                                            readOnly={!isEditing}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Parent Contact</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="parentContact"
                                                            value={selectedStudent.parentContact}
                                                            onChange={handleChange}
                                                            readOnly={!isEditing}
                                                        />
                                                    </div>

                                                    <h6 className="fw-bold text-secondary mt-4 mb-2">
                                                        Contact Information
                                                    </h6>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Student Contact</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="studentContact"
                                                            value={selectedStudent.studentContact}
                                                            onChange={handleChange}
                                                            readOnly={!isEditing}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Email</label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            name="studentEmail"
                                                            value={selectedStudent.studentEmail}
                                                            onChange={handleChange}
                                                            readOnly={!isEditing}
                                                        />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label className="form-label">City</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="city"
                                                            value={selectedStudent.city}
                                                            onChange={handleChange}
                                                            readOnly={!isEditing}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">State</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="state"
                                                            value={selectedStudent.state}
                                                            onChange={handleChange}
                                                            readOnly={!isEditing}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Pin Code</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="pinCode"
                                                            value={selectedStudent.pinCode}
                                                            onChange={handleChange}
                                                            readOnly={!isEditing}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Address</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="address"
                                                            value={selectedStudent.address}
                                                            onChange={handleChange}
                                                            readOnly={!isEditing}
                                                        />
                                                    </div>

                                                    <h6 className="fw-bold text-secondary mt-4 mb-2">
                                                        School Information
                                                    </h6>
                                                    <div className="col-md-6">
                                                        <label className="form-label">School Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="schoolName"
                                                            value={selectedStudent.schoolName}
                                                            onChange={handleChange}
                                                            readOnly={!isEditing}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">School City</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="schoolCity"
                                                            value={selectedStudent.schoolCity}
                                                            onChange={handleChange}
                                                            readOnly={!isEditing}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Father Occupation</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="fatherOccupation"
                                                            value={selectedStudent.fatherOccupation}
                                                            onChange={handleChange}
                                                            readOnly={!isEditing}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Father Address</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="fatherAddress"
                                                            value={selectedStudent.fatherAddress}
                                                            onChange={handleChange}
                                                            readOnly={!isEditing}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* FEES TAB (Future Implementation) */}
                                    <div className="tab-pane fade" id="fees" role="tabpanel">
                                        <div className="p-3">
                                            <h5 className="fw-bold text-primary mb-3">💰 Fee Management</h5>
                                            <p className="text-muted">
                                                This section will allow you to view and update student fee
                                                details, such as payment history, due amounts, and receipts.
                                            </p>
                                        </div>
                                    </div>

                                    {/* ATTENDANCE TAB (Future Implementation) */}
                                    <div className="tab-pane fade" id="attendance" role="tabpanel">
                                        <div className="p-3">
                                            <h5 className="fw-bold text-success mb-3">📅 Attendance</h5>
                                            <p className="text-muted">
                                                Here you’ll be able to record and view student attendance,
                                                monthly summaries, and generate reports.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="modal-footer bg-light">
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
}

export default ManageStudents;
