import "./VerifyEmail.css";
import React, { useState } from "react";
import image from "../../../../assetsimg/auto-intelli-logo.png";
import { ImSpinner } from "react-icons/im";
import { URL_ResendOTP, URL_VerifyUserCode } from "../../../API-URL";

const VerifyEmail = () => {
  const [OTP, setOtp] = useState("");
  const [otperror, setotperror] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  console.log("Token:", id);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const API = URL_VerifyUserCode;
      const response = await fetch(API, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, OTP }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("API response:", data);
      } else if (response.status === 302) {
        const responseData = await response.json();
        console.log("re", responseData.url);
        console.log("Redirecting...", response.headers.location);
        window.location.href = responseData.url;
      } else {
        const responseData = await response.json();
        console.error("Failed to call API:", responseData.message);
        setotperror(responseData.message);
        setTimeout(() => {
          setotperror("");
        }, 3000);
      }
    } catch (error) {
      console.log("Error:", error);
      if (error.response.url) {
        console.log("Redirecting to:", error.response.url);
      } else {
        setotperror("An error occurred. Please try again later.");
        setTimeout(() => {
          setotperror("");
        }, 3000);
      }
    } finally {
      setLoading(false);
      setOtp("");
    }
  };

  const handleResend = async () => {
    try {
      setLoading(true);
      const API = URL_ResendOTP;
      const response = await fetch(API, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        console.log("OTP Resent Successfully");
      } else {
        const responseData = await response.json();
        console.error("Failed to resend OTP:", responseData.message);
        setotperror(responseData.message);
        setTimeout(() => {
          setotperror("");
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
      setotperror("An error occurred. Please try again later.");
      setTimeout(() => {
        setotperror("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bgImage">
        <section className="authContainer appLayoutRouterView">
          <div className="authLayout authMagicLink authContainerRouterView">
            <header className="authLayoutHeader">
              <img src={image} alt="" className="logoMark authLayoutLogo" />
              <h3 className="headerH">Check Your Mail</h3>
              <h6 className="authLayoutHeaderSubtext">
                <div>
                  Didn't receive an email?{" "}
                  <button
                    onClick={handleResend}
                    className="pLink"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Resend
                  </button>
                </div>
              </h6>
            </header>
            <div className="authLayoutContent">
              <div className="pContent">
                <div>
                  We sent an email with a verification code. The code will
                  expire after 10 minutes.
                </div>
              </div>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="Check-otp-input-cont">
                    <div className="inputAndButton">
                      <input
                        className="form-control"
                        placeholder="Enter The OTP"
                        value={OTP}
                        onChange={handleOtpChange}
                        required
                        onKeyPress={(event) => {
                          const keyCode = event.keyCode || event.which;
                          const keyValue = String.fromCharCode(keyCode);
                          const regex = /^[0-9()-_+]*$/;
                          if (!regex.test(keyValue)) {
                            event.preventDefault();
                          }
                        }}
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
                    </div>
                  </div>
                </form>
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    marginTop: "10px",
                  }}
                >
                  <span style={{ color: "red" }}>{otperror}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default VerifyEmail;
