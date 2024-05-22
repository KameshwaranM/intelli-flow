import React, { useState, useEffect, useMemo } from "react";
import "../LandingPage/index.css";
import Blur from "react-blur";
import BackgroundImage from "../../../../Assets/background11.png";
import Navbar from "../Navbar";
import MainSub from "./Autointelli";
import Footer from "../Footer";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { ImSpinner } from "react-icons/im";

const Landing = () => {
  const [h11, seth11] = useState("Autointelli");
  const [i, seti] = useState(0);
  const [delay, setDelay] = useState(true);
  const [signupError, setSignupError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const arr = useMemo(
    () => [
      "Monitoring",
      "Workflow",
      "Automation",
      "Event / Alerts",
      "Autointelli",
    ],
    []
  );
  
  const handelSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const API = "http://192.168.1.5:8985/api/register";
      const res = await axios.post(API, formData);
      if (res.status === 200) {
        console.log("Data sent successfully:", res.data);
        window.location.href = "/Email_Verify";
      } else {
        console.log("Failed to send data.");
        setSignupError("Failed to sign up. Please try again later.");
        setTimeout(() => {
          setSignupError("");
        }, 3000);
      }
    } catch (error) {
      console.log("Response data message:", error.response.data.message);
      setSignupError(error.response.data.message);
        setTimeout(() => {
          setSignupError("");
        }, 3000);
      }finally {
        setLoading(false);
      }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (delay) {
          setDelay(false);
        } else {
          seti((i + 1) % arr.length);
        }
      },
      delay ? 500 : 2000
    );
    return () => clearTimeout(timeout);
  }, [i, arr, delay]);

  useEffect(() => {
    seth11(arr[i]);
  }, [i, arr]);

  useEffect(() => {
    const element = document.getElementById("ani");
    if (element) {
      element.classList.add("animate-bottom");
      const timeout = setTimeout(() => {
        element.classList.remove("animate-bottom");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [h11]);

  return (
    <>
      <Navbar />
      <div className="LandingPage">
        <div className="error-alert">
          {signupError && <Alert severity="error">{signupError}</Alert>}
        </div>
        <Blur
          img={BackgroundImage}
          className="LandingPage-bgImage"
          blurRadius={30}
        ></Blur>
        <div className="LandingPage-left">
          <p className="LandingPage-title">Is it the</p>
          <div className="LandingPage-animation">
            <span id="ani" className="animate-bottom">
              {h11}
            </span>
          </div>
          <div className="LandingPage-subTitle1">
            <h3 className="LandingPage-subTitle">
              Free end-to-end monitoring for your entire stack in 5 <br />
              minutes or less
            </h3>
          </div>
          <div className="LandingPage-form">
            <form className="LandingPage-inputForm" onSubmit={handelSignUp}>
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className="LandingPage-nameInput"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  name="username"
                  pattern="[A-Za-z ]+" 
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Company Email"
                  className="LandingPage-emailInput"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                />
              </div>
              <button className="LandingPage-GetStart">{loading ? (
                      <>
                         Loading...<ImSpinner className="submit-spiner" />
                      </>
                    ) : (
                      'Get Start Free'
                    )}</button>
            </form>
          </div>
          <div className="LandingPage-Detail">
            <p>
              By signing up you're agreeing to
              <span className="LandingPage-underline">
                Terms
                <br /> of Service
              </span>
              <span> and</span>
              <span className="LandingPage-underline">
                {" "}
                Service Privacy Notice.
              </span>
            </p>
          </div>
          <div>
            <p className="LandingPage-creditCard">
              100GB + 1 user free.Forever.
              <br />
              No credit card required.
            </p>
          </div>
        </div>
      </div>
      <MainSub />
      <Footer />
    </>
  );
};
export default Landing;
