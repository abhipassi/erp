import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
 import "./login.css"; 

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState("");


  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/api/login", data);    
      console.log("Login Success:", response.data);
      localStorage.setItem("token", response.data.token); 
      window.location.href = "/home"; 
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage(error.response ? error.response.data.message : "An error occurred");
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
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="login-btn">Login</button>
      </form>

      <div className="signup-link">
        <p>Don't have an account? <a href="/signUp">Sign up</a></p>
      </div>
    </div>
  );
};

export default Login;
