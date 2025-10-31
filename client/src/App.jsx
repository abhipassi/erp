import { Routes, Route } from "react-router-dom";
import Admission from "./studentComponents/admission";
import SignUp from "./authCompnents/signUp";
import Login from "./authCompnents/login";
import ViewReceipts from "./authCompnents/viewReceipt";

function App() {
  return (
    <Routes>
      <Route path="/admission" element={<Admission />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
