import React from "react";
import "./Business-Settings-Account.css";
import { IoInformationCircle } from "react-icons/io5";
import Sidebar from "../../Sidebar/Sidebar";

const BusinessSettingsAccount = () => {
  return (
    <div className="bsAccount">
      <Sidebar />
      <div className="bsAccount-container">
        <h2>Account</h2>
        <div className="bsCard-top">
          <p>Name</p>
          <h4>Business Name</h4>
          <p>Account ID</p>
          <h4>Nano ID</h4>
          <p>Billing Email</p>
          <h4>owneremail@gmail.com</h4>
          <p>Instance Regions</p>
          <h4>EU / US /India</h4>
        </div>
        <div className="bsCard-bottom">
          <h4>Workflow History Retention Period</h4>
          <p>7 Days</p>
          <span>
            <IoInformationCircle className="infoIcon" /> Workflow History that
            ended more than 7 days ago will be removed. Need More ?{" "}
            <a href="http://www.autointelli.com">Upgrade</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BusinessSettingsAccount;
