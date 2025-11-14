// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Table,
//   Button,
//   Container,
//   Modal,
//   Form,
// } from "react-bootstrap";

// const Course = () => {
//   const [courses, setCourses] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [selectedId, setSelectedId] = useState(null);
//   const [courseData, setCourseData] = useState({
//     courseName: "",
//     courseFees: "",
//     courseDuration: "",
//     courseType: "",
//   });
//   const [error, setError] = useState("");

//   const API_BASE = "http://localhost:3000/api/courses";

//   // Fetch all courses
//   const fetchCourses = async () => {
//     try {
//       const res = await axios.get(API_BASE);
//       setCourses(res.data);
//     } catch (err) {
//       console.error("Error fetching courses:", err);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   // Handle input change
//   const handleChange = (e) => {
//     setCourseData({ ...courseData, [e.target.name]: e.target.value });
//   };

//   // Open Add Modal
//   const handleAdd = () => {
//     setEditMode(false);
//     setSelectedId(null);
//     setCourseData({
//       courseName: "",
//       courseFees: "",
//       courseDuration: "",
//       courseType: "",
//     });
//     setShowModal(true);
//     setError("");
//   };

//   // Open Edit Modal
//   const handleEdit = (course) => {
//     setEditMode(true);
//     setSelectedId(course.courseID);
//     setCourseData({
//       courseName: course.courseName,
//       courseFees: course.courseFees,
//       courseDuration: course.courseDuration,
//       courseType: course.courseType,
//     });
//     setShowModal(true);
//     setError("");
//   };

//   // Close Modal
//   const handleClose = () => {
//     setShowModal(false);
//     setEditMode(false);
//     setError("");
//   };

//   // Add or Update Course
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       !courseData.courseName ||
//       !courseData.courseFees ||
//       !courseData.courseDuration ||
//       !courseData.courseType
//     ) {
//       setError("All fields are required!");
//       return;
//     }

//     try {
//       if (editMode) {
//         await axios.put(`${API_BASE}/${selectedId}`, courseData);
//         alert("Course updated successfully!");
//       } else {
//         await axios.post(API_BASE, courseData);
//         alert("Course added successfully!");
//       }

//       fetchCourses();
//       handleClose();
//     } catch (err) {
//       console.error("Error saving course:", err);
//       setError("Failed to save course.");
//     }
//   };

//   // Delete Course
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this course?")) {
//       try {
//         await axios.delete(`${API_BASE}/${id}`);
//         alert("Course deleted successfully!");
//         fetchCourses();
//       } catch (err) {
//         console.error("Error deleting course:", err);
//       }
//     }
//   };

//   return (
//     <Container className="mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h3>Course Management</h3>
//         <Button variant="primary" onClick={handleAdd}>
//           + Add Course
//         </Button>
//       </div>

//       <Table bordered hover responsive className="shadow-sm text-center">
//         <thead className="table-dark">
//           <tr>
//             <th>#</th>
//             <th>Course Name</th>
//             <th>Fees</th>
//             <th>Duration</th>
//             <th>Type</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {courses.length > 0 ? (
//             courses.map((course, index) => (
//               <tr key={course.courseID}>
//                 <td>{index + 1}</td>
//                 <td>{course.courseName}</td>
//                 <td>₹{course.courseFees}</td>
//                 <td>{course.courseDuration}</td>
//                 <td>{course.courseType}</td>
//                 <td>
//                   <Button
//                     variant="info"
//                     size="sm"
//                     className="me-2"
//                     onClick={() => handleEdit(course)}
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     variant="danger"
//                     size="sm"
//                     onClick={() => handleDelete(course.courseID)}
//                   >
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" className="text-muted">
//                 No courses found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </Table>

//       {/* ================= Modal ================= */}
//       <Modal show={showModal} onHide={handleClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>{editMode ? "Edit Course" : "Add New Course"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {error && <p className="text-danger">{error}</p>}
//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3">
//               <Form.Label>Course Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="courseName"
//                 placeholder="Enter course name"
//                 value={courseData.courseName}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Course Fees</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="courseFees"
//                 placeholder="Enter course fees"
//                 value={courseData.courseFees}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Course Duration</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="courseDuration"
//                 placeholder="e.g. 3 Years"
//                 value={courseData.courseDuration}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Course Type</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="courseType"
//                 placeholder="e.g. Full-time / Part-time"
//                 value={courseData.courseType}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <div className="text-center">
//               <Button type="submit" variant={editMode ? "warning" : "primary"}>
//                 {editMode ? "Update Course" : "Add Course"}
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// };

// export default Course;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Modal, Form } from "react-bootstrap";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [courseData, setCourseData] = useState({
    courseName: "",
    courseFees: "",
    courseDuration: "",
    courseType: "",
    installment: "",
  });
  const [error, setError] = useState("");

  const API_BASE = "http://localhost:3000/api/courses";

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const res = await axios.get(API_BASE);
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  // Open Add Modal
  const handleAdd = () => {
    setEditMode(false);
    setSelectedId(null);
    setCourseData({
      courseName: "",
      courseFees: "",
      courseDuration: "",
      courseType: "",
      installment: "",
    });
    setShowModal(true);
    setError("");
  };

  // Open Edit Modal
  const handleEdit = (course) => {
    setEditMode(true);
    setSelectedId(course.courseID);
    setCourseData({
      courseName: course.courseName,
      courseFees: course.courseFees,
      courseDuration: course.courseDuration,
      courseType: course.courseType,
      installment: course.installment,
    });
    setShowModal(true);
    setError("");
  };

  // Close Modal
  const handleClose = () => {
    setShowModal(false);
    setEditMode(false);
    setError("");
  };

  // Add or Update Course
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { courseName, courseFees, courseDuration, courseType, installment } =
      courseData;

    if (
      !courseName ||
      !courseFees ||
      !courseDuration ||
      !courseType ||
      !installment
    ) {
      setError("All fields are required!");
      return;
    }

    try {
      if (editMode) {
        await axios.put(`${API_BASE}/${selectedId}`, courseData);
        alert("Course updated successfully!");
      } else {
        await axios.post(API_BASE, courseData);
        alert("Course added successfully!");
      }

      fetchCourses();
      handleClose();
    } catch (err) {
      console.error("Error saving course:", err);
      setError("Failed to save course.");
    }
  };

  // Delete Course
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`${API_BASE}/${id}`);
        alert("Course deleted successfully!");
        fetchCourses();
      } catch (err) {
        console.error("Error deleting course:", err);
      }
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Course Management</h3>
        <Button variant="primary" onClick={handleAdd}>
          + Add Course
        </Button>
      </div>

      <Table bordered hover responsive className="shadow-sm text-center">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Course Name</th>
            <th>Fees</th>
            <th>Duration</th>
            <th>Type</th>
            <th>Installment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <tr key={course.courseID}>
                <td>{index + 1}</td>
                <td>{course.courseName}</td>
                <td>₹{course.courseFees}</td>
                <td>{course.courseDuration}</td>
                <td>{course.courseType}</td>
                <td>{course.installment}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(course)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(course.courseID)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-muted">
                No courses found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* ================= Modal ================= */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit Course" : "Add New Course"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p className="text-danger">{error}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type="text"
                name="courseName"
                placeholder="Enter course name"
                value={courseData.courseName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Course Fees</Form.Label>
              <Form.Control
                type="number"
                name="courseFees"
                placeholder="Enter course fees"
                value={courseData.courseFees}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Course Duration</Form.Label>
              <Form.Control
                type="text"
                name="courseDuration"
                placeholder="e.g. 3 Years"
                value={courseData.courseDuration}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Course Type</Form.Label>
              <Form.Select
                name="courseType"
                value={courseData.courseType}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                <option value="Class Room">Class Room</option>
                <option value="Course Material">Course Material</option>
                <option value="Exam Material">Exam Material</option>
                <option value="Online Class">Online Class</option>
                <option value="Test Series">Test Series</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Installment</Form.Label>
              <Form.Control
                type="text"
                name="installment"
                placeholder="e.g. Monthly / One-time"
                value={courseData.installment}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="text-center">
              <Button type="submit" variant={editMode ? "warning" : "primary"}>
                {editMode ? "Update Course" : "Add Course"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Course;
