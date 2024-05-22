import React from "react";
import { CiSearch } from "react-icons/ci";
import "../Navbar/index.css";

const Navbar = () => {

  const handleDemoButtonClick = () => {
    window.location.href = "/Request-a-Demo";
  };

  return (
    <div className="navbar">
      <div>
        <img
          className="Navbar-logo"
          src={require("../../../../Assets/auto-intelli-logo.png")}
          alt="cc"
        />
        <div className="Navbar-Seacrh">
          <div className="Navbar-SearchBox">
            <input
              type="text"
              placeholder="Search....."
              className="Navbar-SearchInput"
            />
            <CiSearch className="NavbarSearchIcon" />
          </div>
          <div>
            <a href="/Login" className="Navbar-login">
              Login
            </a>
          </div>
          <div className="Demo">
            <button className="NavbarDemoBtn" onClick={handleDemoButtonClick}>GetDemo</button>
          </div>
        </div>
      </div>
      <div className="hr"></div>
    </div>
  );
};

export default Navbar;