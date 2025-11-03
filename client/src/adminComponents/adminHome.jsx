import React from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminHome() {
  const navigate = useNavigate();

  return (
    <div
      className="container-fluid p-4"
      style={{ backgroundColor: "#f8f9fc", minHeight: "100vh" }}
    >
      {/* Header */}
      <div className="card shadow border-0 rounded-4 p-4 mx-auto mb-4" style={{ maxWidth: "900px" }}>
        <h3 className="fw-bold text-primary text-center mb-0">🏢  Admin Dashboard</h3>
        <p className="text-center text-muted mt-2 mb-0">
          Welcome back, <strong>Admin</strong> 👋
        </p>
      </div>

      {/* Main Dashboard Section */}
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="row g-4">
            {/* Card 1 */}
            <div className="col-md-4">
              <div className="card shadow border-0 rounded-4 text-center p-4 hover-effect">
                <h5 className="fw-bold text-primary mb-2">👨‍🏫 Manage Students</h5>
                <p className="text-muted mb-3">
                  View, add, or update student details and performance records.
                </p>
                <button className="btn btn-outline-primary rounded-3 px-4 py-2" onClick={() =>navigate("/manageStudents")}>
                  View Students
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-md-4">
              <div className="card shadow border-0 rounded-4 text-center p-4 hover-effect">
                <h5 className="fw-bold text-primary mb-2">👩‍🏫 Manage Faculty</h5>
                <p className="text-muted mb-3">
                  Access faculty information and manage teaching assignments.
                </p>
                <button className="btn btn-outline-primary rounded-3 px-4 py-2">
                  View Faculty
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-md-4">
              <div className="card shadow border-0 rounded-4 text-center p-4 hover-effect">
                <h5 className="fw-bold text-primary mb-2">📊 Reports & Analytics</h5>
                <p className="text-muted mb-3">
                  Generate and analyze attendance, grades, and performance data.
                </p>
                <button className="btn btn-outline-primary rounded-3 px-4 py-2">
                  View Reports
                </button>
              </div>
            </div>

            {/* Card 4 */}
            <div className="col-md-4">
              <div className="card shadow border-0 rounded-4 text-center p-4 hover-effect">
                <h5 className="fw-bold text-primary mb-2">💰 Finance</h5>
                <p className="text-muted mb-3">
                  Track and manage fee collections and staff payroll details.
                </p>
                <button className="btn btn-outline-primary rounded-3 px-4 py-2">
                  Manage Finance
                </button>
              </div>
            </div>

            {/* Card 5 */}
            <div className="col-md-4">
              <div className="card shadow border-0 rounded-4 text-center p-4 hover-effect">
                <h5 className="fw-bold text-primary mb-2">📅 Timetable</h5>
                <p className="text-muted mb-3">
                  Manage class schedules and allocate resources effectively.
                </p>
                <button className="btn btn-outline-primary rounded-3 px-4 py-2">
                  View Timetable
                </button>
              </div>
            </div>

            {/* Card 6 */}
            <div className="col-md-4">
              <div className="card shadow border-0 rounded-4 text-center p-4 hover-effect">
                <h5 className="fw-bold text-primary mb-2">⚙️ Settings</h5>
                <p className="text-muted mb-3">
                  Update profile, manage system settings, or log out securely.
                </p>
                <button className="btn btn-outline-primary rounded-3 px-4 py-2">
                  Go to Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-5 text-muted small">
        © {new Date().getFullYear()} ERP System | Built with ❤️ using React & Bootstrap
      </div>
    </div>
  );
}

export default AdminHome;
