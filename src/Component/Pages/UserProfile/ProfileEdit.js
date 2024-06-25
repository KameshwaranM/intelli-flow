import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from '../../Sidebar/Sidebar';
import './ProfileEdit.css'


function ProfileEdit() {
  const navigate = useNavigate();
  const [ username , setUserName] = useState(null);

  useEffect(() => {
    const UserName = localStorage.getItem("userEmail")
    setUserName(UserName)
  })

  const [profile, setProfile] = useState({
    name: 'Kameshwaran M',
    handle: 'rho309-cuello-expanse',
    userId: '2b824005-54da-4911-a0cf-44f3bb9ce90c',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log('Profile saved', profile);
    navigate('/Your_Profile', { state: { profile } });
  };

  return (
    <>
    <div className=" user-profile-edit-root">
      <SidebarMenu />
      <div className="user-profile-edit-content">
      <h2 className="intelli-flow-right-side-headline">Edit Profile</h2>
        <div className="pro-edit-card">
          <div className="pro-edit-cardContent">
            <form className="pro-edit-form">
              <div className="pro-edit-inputContainer">
                <label className="pro-edit-label">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="pro-edit-input"
                />
              </div>
              <div className="inputContainer">
                <label className="label">Handle</label>
                <input
                  type="text"
                  placeholder="Handle"
                  name="handle"
                  value={profile.handle}
                  onChange={handleChange}
                  className="pro-edit-input"
                />
              </div>
              <div className="inputContainer">
                <label className="label">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={username}
                  onChange={handleChange}
                  className="pro-edit-input"
                />
              </div>
              <div className="inputContainer">
                <label className="label">User ID</label>
                <input
                  type="text"
                  placeholder="User ID"
                  name="userId"
                  value={profile.userId}
                  onChange={handleChange}
                  className="pro-edit-input"
                />
              </div>
              <div className="buttonGroup">
                <button
                  type="button"
                  className="pro-edit-whiteButton"
                  onClick={() => navigate('/Your_Profile')}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="pro-edit-buttons"
                  onClick={handleSave}
                >
                  Save
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

export default ProfileEdit;