import React from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
    const navigate = useNavigate();

    return (
        <div
            className="container-fluid p-4"
            style={{ backgroundColor: "#f8f9fc", minHeight: "100vh" }}
        >
            {/* Header */}
            <div
                className="card shadow border-0 rounded-4 p-4 mx-auto mb-4"
                style={{ maxWidth: "900px" }}
            >
                <h3 className="fw-bold text-primary text-center mb-0">
                    🎓 Student Dashboard
                </h3>
                <p className="text-center text-muted mt-2 mb-0">
                    Welcome back, <strong>Student</strong> 👋
                </p>
            </div>

            {/* Main Dashboard Section */}
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="row g-4">
                        {/* Profile */}
                        <div className="col-md-4">
                            <div className="card shadow border-0 rounded-4 text-center p-4 hover-effect">
                                <h5 className="fw-bold text-primary mb-2">👤 My Profile</h5>
                                <p className="text-muted mb-3">
                                    View and update your personal details and contact information.
                                </p>
                                <button
                                    className="btn btn-outline-primary rounded-3 px-4 py-2"
                                    onClick={() => navigate("/student/profile")}
                                >
                                    View Profile
                                </button>
                            </div>
                        </div>

                        {/* Attendance */}
                        <div className="col-md-4">
                            <div className="card shadow border-0 rounded-4 text-center p-4 hover-effect">
                                <h5 className="fw-bold text-primary mb-2">🕒 Attendance</h5>
                                <p className="text-muted mb-3">
                                    Check your attendance percentage and subject-wise record.
                                </p>
                                <button
                                    className="btn btn-outline-primary rounded-3 px-4 py-2"
                                    onClick={() => navigate("/student/attendance")}
                                >
                                    View Attendance
                                </button>
                            </div>
                        </div>

                        {/* Fees */}
                        <div className="col-md-4">
                            <div className="card shadow border-0 rounded-4 text-center p-4 hover-effect">
                                <h5 className="fw-bold text-primary mb-2">💰 Fees</h5>
                                <p className="text-muted mb-3">
                                    Track your fee payments, dues, and transaction history.
                                </p>
                                <button
                                    className="btn btn-outline-primary rounded-3 px-4 py-2"
                                    onClick={() => navigate("/student/fees")}
                                >
                                    Check Fees
                                </button>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="col-md-4">
                            <div className="card shadow border-0 rounded-4 text-center p-4 hover-effect">
                                <h5 className="fw-bold text-primary mb-2">📄 Results</h5>
                                <p className="text-muted mb-3">
                                    View your semester results, grades, and performance summary.
                                </p>
                                <button
                                    className="btn btn-outline-primary rounded-3 px-4 py-2"
                                    onClick={() => navigate("/student/results")}
                                >
                                    View Results
                                </button>
                            </div>
                        </div>

                        {/* Timetable */}
                        <div className="col-md-4">
                            <div className="card shadow border-0 rounded-4 text-center p-4 hover-effect">
                                <h5 className="fw-bold text-primary mb-2">📅 Timetable</h5>
                                <p className="text-muted mb-3">
                                    Access your daily and weekly class schedule easily.
                                </p>
                                <button
                                    className="btn btn-outline-primary rounded-3 px-4 py-2"
                                    onClick={() => navigate("/student/timetable")}
                                >
                                    View Timetable
                                </button>
                            </div>
                        </div>

                        {/* Announcements */}
                        <div className="col-md-4">
                            <div className="card shadow border-0 rounded-4 text-center p-4 hover-effect">
                                <h5 className="fw-bold text-primary mb-2">📢 Announcements</h5>
                                <p className="text-muted mb-3">
                                    Stay updated with university notices and upcoming events.
                                </p>
                                <button
                                    className="btn btn-outline-primary rounded-3 px-4 py-2"
                                    onClick={() => navigate("/student/announcements")}
                                >
                                    View Notices
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-5 text-muted small">
                © {new Date().getFullYear()} ERP System | Student Portal |
            </div>
        </div>
    );
}

export default StudentDashboard;
