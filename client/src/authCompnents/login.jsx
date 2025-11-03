import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/login", data);

      console.log("Login Success:", response.data);

      // Save token & role
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);

      // Show success toast
      toast.success("Login successful! Redirecting...", {
        position: "top-center",
        autoClose: 1500,
      });

      // Redirect based on role after toast delay
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
    <div className="login-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <div className="input-group">
          <label htmlFor="username">Username or Email:</label>
          <input
            type="text"
            id="username"
            {...register("username", { required: "Username or email is required" })}
            placeholder="Enter username or email"
          />
          {errors.username && <p className="error-message">{errors.username.message}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Enter password"
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="login-btn"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="signup-link">
        <p>
          Don't have an account? <a href="/signUp">Sign up</a>
        </p>
      </div>

      {/*  Toast container (can also be moved to App.js) */}
      <ToastContainer />
    </div>
  );
};

export default Login;
