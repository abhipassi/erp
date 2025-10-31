import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

const ViewReceipts = () => {
  const [receipts, setReceipts] = useState([]);
  const [filteredReceipts, setFilteredReceipts] = useState([]);
  const [courses, setCourses] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editReceipt, setEditReceipt] = useState(null);

  //  Fetch all receipts
  const fetchReceipts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/receipt");
      setReceipts(res.data);
      setFilteredReceipts(res.data);
    } catch (error) {
      console.error("Error fetching receipts:", error);
    }
  };

  //  Fetch all courses (for filter dropdown)
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/course");
      setCourses(res.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchReceipts();
    fetchCourses();
  }, []);

  // Filter receipts by search term and course
  useEffect(() => {
    let filtered = receipts;

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (r) =>
          r.admissionNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.studentName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCourse) {
      filtered = filtered.filter(
        (r) => r.Course?.CourseName === selectedCourse
      );
    }

    setFilteredReceipts(filtered);
  }, [searchTerm, selectedCourse, receipts]);

  // Delete a receipt
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this receipt?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/receipt/${id}`);
      alert("Receipt deleted successfully!");
      fetchReceipts();
    } catch (error) {
      console.error("Error deleting receipt:", error);
      alert("Failed to delete receipt");
    }
  };

  //  Open edit modal
  const handleEdit = (receipt) => {
    setEditReceipt({ ...receipt });
    setShowModal(true);
  };

  //  Save updated receipt
  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/receipt/${editReceipt.id}`,
        editReceipt
      );
      alert("Receipt updated successfully!");
      setShowModal(false);
      fetchReceipts();
    } catch (error) {
      console.error("Error updating receipt:", error);
      alert("Failed to update receipt");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">All Receipts</h3>

      {/* 🔍 Search and Filter Section */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <div className="mb-2">
          <Form.Control
            type="text"
            placeholder="Search by Admission No or Student Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "280px" }}
          />
        </div>

        <div className="mb-2">
          <Form.Select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            style={{ width: "250px" }}
          >
            <option value="">Filter by Course</option>
            {courses.map((course) => (
              <option key={course.courseID} value={course.CourseName}>
                {course.CourseName}
              </option>
            ))}
          </Form.Select>
        </div>
      </div>

      {/*  Receipts Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>Receipt No</th>
              <th>Admission No</th>
              <th>Student Name</th>
              <th>Course</th>
              <th>Date</th>
              <th>Mode</th>
              <th>Amount</th>
              <th>Total with GST</th>
              <th>Pending</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReceipts.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center">
                  No receipts found
                </td>
              </tr>
            ) : (
              filteredReceipts.map((r) => (
                <tr key={r.id}>
                  <td>{r.ReceiptNo}</td>
                  <td>{r.admissionNo}</td>
                  <td>{r.studentName || "N/A"}</td>
                  <td>{r.Course?.CourseName || "N/A"}</td>
                  <td>{new Date(r.paymentDate).toLocaleDateString()}</td>
                  <td>{r.mode}</td>
                  <td>₹{r.amount}</td>
                  <td>₹{r.totalWithGST}</td>
                  <td>₹{r.pendingFees}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(r)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(r.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/*  Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Receipt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editReceipt && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Mode</Form.Label>
                <Form.Select
                  value={editReceipt.mode}
                  onChange={(e) =>
                    setEditReceipt({ ...editReceipt, mode: e.target.value })
                  }
                >
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="UPI">UPI</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={editReceipt.amount}
                  onChange={(e) =>
                    setEditReceipt({ ...editReceipt, amount: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Particulars</Form.Label>
                <Form.Control
                  type="text"
                  value={editReceipt.particulars}
                  onChange={(e) =>
                    setEditReceipt({
                      ...editReceipt,
                      particulars: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewReceipts;
