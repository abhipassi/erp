  import React, { useState } from "react";
  import { useForm } from "react-hook-form";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import "bootstrap/dist/css/bootstrap.min.css";

  const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
      setLoading(true);
      try {
        //const response = await axios.post("http://localhost:3000/api/login", data);
        const response = await axios.post("http://localhost:3000/api/auth/login", data);

        console.log("Login Success:", response.data);

        // Save token & role
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.user.role);

        // Success toast
        toast.success("Login successful! Redirecting...", {
          position: "top-center",
          autoClose: 1500,
        });

        // Redirect based on role
        const role = response.data.user.role.toLowerCase();
        setTimeout(() => {
          if (role === "admin") navigate("/adminDashboard");
          else if (role === "student") navigate("/studentDashboard");
          else if (role === "teacher") navigate("/teacherDashboard");
          else navigate("/home");
        }, 1600);
      } catch (error) {
        console.error("Login failed:", error);
        toast.error(
          error.response?.data?.message || "Invalid credentials. Please try again.",
          { position: "top-center" }
        );
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="container-fluid d-flex align-items-center justify-content-center bg-light" style={{ minHeight: "100vh" }}>
        <div className="card shadow-lg border-0 rounded-4 p-4" style={{ width: "100%", maxWidth: "450px" }}>
          <h3 className="text-center fw-bold text-primary mb-4">🔐 Login</h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Username / Email */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label fw-semibold">Username or Email</label>
              <input
                type="text"
                id="username"
                className={`form-control ${errors.username ? "is-invalid" : ""}`}
                placeholder="Enter your username or email"
                {...register("username", { required: "Username or email is required" })}
              />
              {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">Password</label>
              <input
                type="password"
                id="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            </div>

            {/* Submit Button */}
            <div className="d-grid mt-4">
              <button type="submit" className="btn btn-primary py-2 rounded-3 shadow-sm" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span> Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          {/* Signup Link */}
          <div className="text-center mt-4">
            <p className="text-muted mb-0">
              Don’t have an account?{" "}
              <a href="/signUp" className="fw-semibold text-decoration-none text-primary">
                Sign Up
              </a>
            </p>
          </div>
        </div>

        {/* Toastify Notifications */}
        <ToastContainer />
      </div>
    );
  };

  export default Login;
