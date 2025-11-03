import React, { useState } from "react";

function ManageStudents() {
    const [students, setStudents] = useState([
        // { id: 1, name: "Amit Sharma", email: "amit@example.com", course: "B.Tech CSE", year: "3rd" },
        // { id: 2, name: "Priya Verma", email: "priya@example.com", course: "BCA", year: "2nd" },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [newStudent, setNewStudent] = useState({
        name: "",
        email: "",
        course: "",
        year: "",
    });

    const getStudentData = () =>{
        
    }

    const handleChange = (e) => {
        setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
    };

    const handleAddStudent = (e) => {
        e.preventDefault();
        if (!newStudent.name || !newStudent.email || !newStudent.course || !newStudent.year) {
            alert("Please fill in all fields.");
            return;
        }

        const newEntry = { ...newStudent, id: students.length + 1 };
        setStudents([...students, newEntry]);
        setNewStudent({ name: "", email: "", course: "", year: "" });
        setShowModal(false);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            setStudents(students.filter((student) => student.id !== id));
        }
    };

    return (
        <div
            className="container-fluid p-4"
            style={{ backgroundColor: "#f8f9fc", minHeight: "100vh" }}
        >
            <div className="card shadow border-0 rounded-4 p-4 mx-auto" style={{ maxWidth: "1100px" }}>
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="fw-bold text-primary mb-0">🎓 Manage Students</h3>
                    <button
                        className="btn btn-primary rounded-3 shadow-sm px-4"
                        onClick={() => setShowModal(true)}
                    >
                        + Add Student
                    </button>
                </div>

                {/* Search */}
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
                                <th>Year</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.course}</td>
                                    <td>{student.year}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline-danger rounded-3 me-2"
                                            onClick={() => handleDelete(student.id)}
                                        >
                                            Delete
                                        </button>
                                        <button className="btn btn-sm btn-outline-primary rounded-3">
                                            Edit
                                        </button>
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

            {/* Add Student Modal */}
            {showModal && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content rounded-4 shadow">
                            <div className="modal-header">
                                <h5 className="modal-title text-primary fw-bold">Add New Student</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleAddStudent}>
                                    <div className="mb-3">
                                        <label className="form-label">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={newStudent.name}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Enter full name"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={newStudent.email}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Enter email address"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Course</label>
                                        <input
                                            type="text"
                                            name="course"
                                            value={newStudent.course}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Enter course (e.g., B.Tech CSE)"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Year</label>
                                        <select
                                            name="year"
                                            value={newStudent.year}
                                            onChange={handleChange}
                                            className="form-select"
                                            required
                                        >
                                            <option value="">Select Year</option>
                                            <option value="1st">1st Year</option>
                                            <option value="2nd">2nd Year</option>
                                            <option value="3rd">3rd Year</option>
                                            <option value="4th">4th Year</option>
                                        </select>
                                    </div>
                                    <div className="text-end">
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary me-2"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Add Student
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageStudents;
