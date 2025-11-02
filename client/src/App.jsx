import { Routes, Route } from "react-router-dom";
import Admission from "./studentComponents/admission";
import SignUp from "./authCompnents/signUp";
import Login from "./authCompnents/login";
import ViewReceipts from "./authCompnents/viewReceipt";
import Receipt from "./authCompnents/receipt"

function App() {
  return (
    <Routes>
      <Route path="/admission" element={<Admission />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/createReceipt" element ={<Receipt />} />
    </Routes>
  );
}

export default App;
