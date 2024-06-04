import React, { useState } from "react";
import "../Login/login.css";
import autointlogo from "../../../../Assets/Intellil-Flow-Logo.png";

import axios from "axios";
import { ImSpinner } from "react-icons/im";
// import { Alert } from "@mui/material";
import { URL_Login } from "../../API-URL";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [signinError, setSigninError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      const API = URL_Login;
      const response = await axios.post(API, {
        email: email,
        password: password,
      });
  
      if (response.status === 200) {
        console.log("Login successful:", response.data);
  
        const userData = response.data.data;
        const { firsttimelogin, businessname , sessionkey, role, email: userEmail } = userData;
  
        localStorage.setItem('sessionKey', sessionkey);
        localStorage.setItem('userRole', role);
        localStorage.setItem('userEmail', userEmail);
        localStorage.setItem('businessname', businessname);
  
        if (firsttimelogin === "y") {
          console.log("First time login. Redirecting to Create Workflow...");
          window.location.href = "/Create_Project";
        } else if (firsttimelogin === "n") {
          console.log("Returning user. Redirecting to Dashboard...");
          window.location.href = "/Dashboard";
        } else {
          console.log("Unexpected response:", response.data);
          setSigninError("Unexpected login status. Please try again.");
          setTimeout(() => {
            setSigninError("");
          }, 3000);
        }
      } else {
        console.log("Unexpected response type:", response.data);
        setSigninError("Unexpected response type. Please try again.");
        setTimeout(() => {
          setSigninError("");
        }, 3000);
      }
    } catch (error) {
      console.error("Login error:", error);
      setSigninError("Login failed. Please check your email and password and try again.");
      setTimeout(() => {
        setSigninError("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="login">
      <div className="header">
        <div className="login-auto-intelli-image">
          <img
            className="login-autointelli-image"
            src={autointlogo}
            alt="Autointelli-logo"
          />
          {/* <div className="alert-mess">
            {signinError && <Alert severity="error">{signinError}</Alert>}
            {loginSuccess && (
              <Alert severity="success">Login successful!</Alert>
            )}
          </div> */}
        </div>
      </div>
      <div className="contents">
        <div className="login-container">
          {/* <div className="alert-mess">
            {signinError && <p severity="error">{signinError}</p>}
            {loginSuccess && (
              <p severity="success">Login successful!</p>
            )}
          </div> */}
          <div className="Login-card">
            <div className="alert-mess">
              {signinError && <p severity="error">{signinError}</p>}
              {loginSuccess && <p severity="success">Login successful!</p>}
            </div>
            <div className="div1">
              <h3>Login</h3>
              <a href="/SignUp">Don't have an account?</a>
            </div>
            <div className="signinForm">
              <form onSubmit={handleLogin}>
                <label>Business Email</label>
                <input
                  type="email"
                  required
                  placeholder="Enter Business Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="div2">
                  <div className="check">
                    {/* Add any additional checkboxes or inputs here */}
                  </div>
                  <a href="/ForgotPassword">Forgot Password?</a>
                </div>
                <button type="submit">
                  {loading ? (
                    <>
                      Loading...
                      <ImSpinner className="submit-spiner" />
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
                {/* <div className="alert-mess">
            {signinError && <p severity="error">{signinError}</p>}
            {loginSuccess && (
              <p severity="success">Login successful!</p>
            )}
          </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="Login-footer"></div>
    </div>
  );
};

export default Login;
