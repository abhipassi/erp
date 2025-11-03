import { Routes, Route } from "react-router-dom";
import Admission from "./studentComponents/admission";
import SignUp from "./authCompnents/signUp";
import Login from "./authCompnents/login";
import Receipt from "./authCompnents/receipt";
import ViewReceipts from "./authCompnents/viewReceipt";

function App() {
  return (
    <Routes>
      {/* Student Pages */}
      <Route path="/admission" element={<Admission />} />

      {/* Auth Pages */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

      {/* Receipt Pages */}
      <Route path="/create-receipt" element={<Receipt />} />
      <Route path="/view-receipts" element={<ViewReceipts />} />
    </Routes>
  );
}

export default App;
