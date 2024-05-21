import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ImSpinner } from "react-icons/im";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import image from '../../../../assetsimg/auto-intelli-logo.png';
import "./CreatePassword.css";
import { URL_ResetPassword } from "../../../API-URL";

const CreatePassword = () => {
  // const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const urlParams = new URLSearchParams(window.location.search);

        const tokens = urlParams.get('id');

        console.log("Token:", tokens);

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(URL_ResetPassword, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: tokens, password }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setMessage("Password submitted successfully");
        console.log("Password submitted successfully", responseData);
        window.location.href = "/Login";
      } else {
        setMessage("Failed to submit password. Please try again.");
        console.error("Failed to submit password:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to submit password:", error.message);
      setMessage("Failed to submit password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = () => {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharacterRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    let errorMessage = "";
    if (!uppercaseRegex.test(password)) {
      errorMessage += "Password requires at least one uppercase letter. ";
    }
    if (!lowercaseRegex.test(password)) {
      errorMessage += "Password requires at least one lowercase letter. ";
    }
    if (!numberRegex.test(password)) {
      errorMessage += "Password requires at least one number. ";
    }
    if (!specialCharacterRegex.test(password)) {
      errorMessage += "Password needs at least one special character. ";
    }
    if (password.length < 8 || password.length > 20) {
      errorMessage += "Password length should be 8-20 characters. ";
    }

    setMessage(errorMessage);

    return errorMessage === "";
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    if (validatePassword()) {
      handlePasswordSubmit(event);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="enterpassword">
      <div className="enterpassword-page">
        <div className="autointelli-image">
          <img alt="enterpassword-autointelli-logo" src={image} />

          <h3 className="enterpassword-title">Create your password</h3>
          <div className="enterpassword-content">
            <p>
              Make your password poetic: Think of a poem that you have memorized
              or that has a strong meaning. Take a line from it and use that as
              your password.
            </p>
          </div>
          <div className="enterpassword-inputfield">
            <form onSubmit={handleSubmit}>
              <TextField
                id="outlined-adornment-password"
                label="Enter Password"
                variant="outlined"
                size="small"
                fullWidth
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handlePasswordChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility style={{ color: "beige" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={message !== ""}
                helperText={message}
              />

              <div className="enterpassword-submit-btn">
                <Button
                  type="submit"
                  style={{
                    textTransform: "none",
                    color: "white",
                    width: "100%",
                  }}
                >
                  {loading ? (
                    <>
                      Loading...
                      <ImSpinner className="submit-spiner" />
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </form>
            <div className="paasserrorr">
              {/* {message && <p>{message}</p>} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;
