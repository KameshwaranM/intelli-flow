import React, { useState } from "react";
import "./index.css";
import Logo from '../../../../Assets/Intellil-Flow-Logo.png';

import { ImSpinner } from "react-icons/im";
import { URL_CreatePassword } from "../../API-URL";

const SetPassword = () => {
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("id");

  const handlePasswordSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(URL_CreatePassword, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: token, Password }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Password submitted successfully", responseData);
      } else if (response.status === 302) {
        const responseData = await response.json();
        console.log("re", responseData.url);
        window.location.href = responseData.url;
      } else {
        const responseData = await response.json();
        console.error("Failed to submit password:", responseData.message);
        setError(responseData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError("");
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setError("");
  };

  const validatePassword = () => {
    // Validation rules
    const rules = [
      { regex: /[A-Z]/, message: "Password requires at least one uppercase letter." },
      { regex: /[a-z]/, message: "Password requires at least one lowercase letter." },
      { regex: /[0-9]/, message: "Password requires at least one number." },
      { regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, message: "Password needs at least one special character." },
      { regex: /^.{8,20}$/, message: "Password length should be between 8 and 20 characters." },
    ];

    // Check each rule
    for (const rule of rules) {
      if (!rule.regex.test(Password)) {
        setError(rule.message);
        return false;
      }
    }

    // Check if passwords match
    if (Password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validatePassword()) {
      handlePasswordSubmit();
    }
  };

  return (
    <div className="login">
      <div className="header">
        <div className="login-auto-intelli-image">
          <img
            className="login-autointelli-image"
            src={Logo}
            alt="Autointelli-logo"
          />
        </div>
      </div>
      <div className="contents">
        <div className="login-container">
          <div className="Login-card">
            <div className="div1">
              <h3>Create Password</h3>
            </div>
            <div className="signinForm">
              <form onSubmit={handleSubmit}>
                <label>New Password</label>
                <input
                  style={{ marginTop: "10px" }}
                  size="small"
                  type="password"
                  required
                  value={Password}
                  onChange={handlePasswordChange}
                />
                <label>Confirm New Password</label>
                <input
                  style={{ marginTop: "10px" }}
                  size="small"
                  type="password"
                  value={confirmPassword}
                  required
                  onChange={handleConfirmPasswordChange}
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
                {error && <div style={{ color: "red" }}>{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="Login-footer"></div>
    </div>
  );
};

export default SetPassword;
