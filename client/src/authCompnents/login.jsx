// import React, { useState } from "react";
// import { useForm } from "react-hook-form";

// import axios from "axios";
//  import "./login.css"; 

// const Login = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [errorMessage, setErrorMessage] = useState("");


//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post("http://localhost:3000/api/login", data);    
//       console.log("Login Success:", response.data);
//       localStorage.setItem("token", response.data.token); 
//       window.location.href = "/home"; 
//     } catch (error) {
//       console.error("Login failed:", error);
//       setErrorMessage(error.response ? error.response.data.message : "An error occurred");
//     }
//   };
//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="login-form">
//         <div className="input-group">
//           <label htmlFor="username">Username or Email:</label>
//           <input
//             type="text"
//             id="username"
//             {...register("username", { required: "Username or email is required" })}
//             placeholder="Enter username or email"
//           />
//           {errors.username && <p className="error-message">{errors.username.message}</p>}
//         </div>
//         <div className="input-group">
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             {...register("password", { required: "Password is required" })}
//             placeholder="Enter password"
//           />
//           {errors.password && <p className="error-message">{errors.password.message}</p>}
//         </div>
//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//         <button type="submit" className="login-btn">Login</button>
//       </form>

//       <div className="signup-link">
//         <p>Don't have an account? <a href="/signUp">Sign up</a></p>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function Login() {
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
    <div
      className="container-fluid p-4"
      style={{ backgroundColor: "#f8f9fc", minHeight: "100vh" }}
    >
      <div className="card shadow border-0 rounded-4 p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h3 className="fw-bold mb-4 text-primary text-center">🔐 Login</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-4">
            <div className="col-md-12">
              <label className="form-label">Username or Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username or email"
                {...register("username", { required: "Username or email is required" })}
              />
              {errors.username && (
                <small className="text-danger">{errors.username.message}</small>
              )}
            </div>

            <div className="col-md-12">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <small className="text-danger">{errors.password.message}</small>
              )}
            </div>

            {errorMessage && (
              <div className="col-md-12">
                <div className="alert alert-danger py-2">{errorMessage}</div>
              </div>
            )}
          </div>

          <div className="text-center mt-4">
            <button
              type="submit"
              className="btn btn-primary px-5 py-2 rounded-3 shadow-sm"
            >
              Login
            </button>
          </div>

          <div className="text-center mt-3">
            <p className="text-muted">
              Don’t have an account?{" "}
              <a href="/signUp" className="text-primary fw-semibold text-decoration-none">
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

