import { Routes, Route } from "react-router-dom";
import Admission from "./studentComponents/admission";
import SignUp from "./authCompnents/signUp";
import Login from "./authCompnents/login";
import Receipt from "./authCompnents/receipt";
import ViewReceipts from "./authCompnents/viewReceipt";
import Course from "./authCompnents/courses";
import ManageStudents from "./adminComponents/manageStudents";
import AdminHome from "./adminComponents/adminHome";
import StudentDashboard from "./studentComponents/studentDashboard";
// import Receipt from "./authCompnents/receipt"

function App() {
  return (
    <Routes>
      {/* Student Pages */}
      <Route path="/admission" element={<Admission />} />

      {/* Course Page */}
      <Route path="/courses" element={<Course />} />

      {/* Auth Pages */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/viewreceipts" element={<ViewReceipts />} />
      <Route path="/createReceipt" element ={<Receipt />} />
      {/* <Route path="/getReceipt" element ={<ViewReceipts />} /> */}

      {/* admin routes  */}
      <Route path="/adminHome" element={<AdminHome />} />
      <Route path="/manageStudents" element={<ManageStudents />} />
      <Route path="/studentDashboard" element={<StudentDashboard />} />

    </Routes>
  );
}

export default App;
