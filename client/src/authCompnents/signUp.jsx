import React, { useState } from "react";

function SignUp() {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const data = {
        name: name.trim(),
        mobileNumber: mobileNumber.trim(),
        password: password.trim(),
        confirmPassword: confirmPassword.trim(),
        email: email.trim(),
      };

      console.log("Form Data:", data);
      alert("Signup Successful!");
    } catch (error) {
      console.log(error);
      alert("Error submitting form!");
    }
  };

  return (
    <div
      className="container-fluid p-4"
      style={{ backgroundColor: "#f8f9fc", minHeight: "100vh" }}
    >
      <div className="card shadow border-0 rounded-4 p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h3 className="fw-bold mb-4 text-primary text-center">📝 Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            <div className="col-md-12">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="col-md-12">
              <label className="form-label">Mobile Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </div>

            <div className="col-md-12">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="col-md-12">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="col-md-12">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="text-center mt-4">
            <button
              type="submit"
              className="btn btn-primary px-5 py-2 rounded-3 shadow-sm"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
