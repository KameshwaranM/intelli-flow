import React, { useState } from "react";
import "../Login/login.css";
import autointlogo from '../../../../Assets/auto-intelli-logo.png'

import axios from "axios";
import { ImSpinner } from "react-icons/im";
// import { Alert } from "@mui/material";
import { URL_Register } from "../../API-URL";

const SignUP = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [signinError, setSigninError] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const API = URL_Register;
      const res = await axios.post(API, {
        Business_name: name,
        Email: email,
      });
      if (res.status === 200) {
        console.log("Data sent successfully:", res.data);
        setLoginSuccess(true);
        setSigninError("");
      } else if (res.status === 302) {
        console.log("Redirecting...", res.headers.location);
        window.location.href = res.headers.location;
      } else {
        console.log("Failed to send data.");
        setSigninError("Failed to sign up. Please try again later.");
        setTimeout(() => {
          setSigninError("");
        }, 3000);
      }
    } catch (error) {
      console.log("Error:", error);
      console.log("Response data message:", error.response.data.message);
      const eroorer = error.response.data.message;
      console.log("res--->",eroorer)
      setSigninError(eroorer);
      if (error.response.data.url) {
        console.log("Redirecting to:", error.response.data.url);
        window.location.href = error.response.data.url;
      }

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
        
          <div className="Login-card">
          <div className="alert-mess">
            {signinError && <p severity="error">{signinError}</p>}
            {loginSuccess && (
              <p severity="success">Login successful!</p>
            )}
          </div>
            <div className="div1">
              <h3>SignUp</h3>
              <a href="/Login">Already have an account?</a>
            </div>
            <div className="signinForm">
              <form onSubmit={handleSignUp}>
                <label>Business Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter Business Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={(event) => {
                    const keyCode = event.keyCode || event.which;
                    const keyValue = String.fromCharCode(keyCode);
                    const regex = /^[A-Za-z\s]*$/;
                    if (!regex.test(keyValue)) {
                      event.preventDefault();
                    }
                  }}
                />
                <label>Business Email</label>
                <input
                  type="email"
                  required
                  placeholder="Enter Business Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

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
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="Login-footer"></div>
    </div>
  );
};

export default SignUP;
