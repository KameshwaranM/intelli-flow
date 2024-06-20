import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from '../../Sidebar/Sidebar';
import "./ResetPwd.css"

function ProfileResetPWD() {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      email: '',
      password: '',
      newPassword: '',
      confirmPassword: '',
    });

    navigate('/Your_Profile');
  };

  return (
    <>
    <div className=" user-profile-edit-root">
      <SidebarMenu />
      <div className="user-profile-edit-content">
      <h2 className="intelli-flow-right-side-headline">Reset Password</h2>
        <div className="pro-edit-card">
          <div className="pro-edit-cardContent">
          <form className="reset-password-form" onSubmit={handleSubmit}>
          <div className="inputContainer">
            <label className="pro-edit-label">Email</label>
            <input
              type="email"
              className="pro-edit-input"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="inputContainer">
            <label className="pro-edit-label">Current Password</label>
            <input
            className="pro-edit-input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your current password"
              required
            />
          </div>
          <div className="inputContainer">
            <label className="pro-edit-label">New Password</label>
            <input
            className="pro-edit-input"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter your new password"
              required
            />
          </div>
          <div className="inputContainer">
            <label className="pro-edit-label">Confirm New Password</label>
            <input
              type="password"
              className="pro-edit-input"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your new password"
              required
            />
          </div>
          <div className="buttonGroup">
                
                <button
                  type="submit"
                  className="pro-edit-buttons"
                >
                  Reset Password
                </button>
              </div>
        </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default ProfileResetPWD;