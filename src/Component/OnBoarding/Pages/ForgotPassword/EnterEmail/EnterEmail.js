import "./EnterEmail.css";
import image from '../../../../../Assets/auto-intelli-logo.png';
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import Alert from "@mui/material/Alert";
import { useFormik } from "formik";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import React, { useState } from "react";
import { ImSpinner } from "react-icons/im";
import { URL_ForgotPassword } from "../../../API-URL";

const EnterEmail = () => {
  const [signinError, setSigninError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const fromVaildationSchema = yup.object({
    email: yup.string().email().required(),
  });

  const { handleSubmit, handleChange } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: fromVaildationSchema,
      onSubmit: (values) => {
        Entermail(values);
      },
    });

  function onChange(value) {
    console.log("Captcha value:", value);
  }

  const Entermail = async (values) => {
    try {
      setLoading(true);
      const API = URL_ForgotPassword;
      const res = await axios.put(API, values);
      if (res.status === 200) {
        const data = res.data;
        console.log("API response:", data);
        window.location.href = data.url;
        setLoginSuccess("Login Sucess")
      } else {
        console.log("Failed to send data..");
        setSigninError("Failed to sign in. Please try again later.");
        setTimeout(() => {
          setSigninError("");
        }, 3000);
      }
    } catch (error) {
      console.log("Response data message:", error.response.data.message);
      setSigninError(error.response.data.message);
      setTimeout(() => {
        setSigninError("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login">
        <div className="header">
          <div className="login-auto-intelli-image">
            <img
              className="login-autointelli-image"
              src={image}
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
                {loginSuccess && <p severity="success">Login successful!</p>}
              </div>
              <div className="div1">
                <h3>Forgot Password</h3>
              </div>
              <div className="signinForm">
              <form onSubmit={handleSubmit}>
              <label>Business Email</label>
              <input
                placeholder="Enter Company Email"
                size="small"
                fullWidth
                type="email"
                name="email"
                onChange={handleChange}
              />
              <div className="recaptcha">
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={onChange}
                  // style={{ transform: "scale(0.60)", transformOrigin: "0 0" }}
                />
                </div>
                <div className="submit-btn">
                  <button
                  className="forgotPassword_Button"
                    type="submit"
                  >
                    {loading ? (
                            <>
                                Loading...<ImSpinner className="submit-spiner" />
                            </>
                        ) : (
                            'Submit'
                        )}
                  </button>
                  <div className="login-link">
                    <a href="/login" className="login-link">
                      return to Login
                    </a>
                  </div>
                </div>
            </form>
              </div>
            </div>
          </div>
        </div>
        <div className="Login-footer"></div>
      </div>
    </>
  );
};

export default EnterEmail;
