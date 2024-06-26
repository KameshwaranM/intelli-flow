import React, { useEffect, useState } from "react";
import "../../Business-Settings/Business-Settings-Account/Business-Settings-Account.css"
import { IoInformationCircle } from "react-icons/io5";
import SidebarMenu from "../../../Sidebar/Sidebar";

const AccountSettings = () => {
  const [ username , setUserName] = useState(null);
  const [businessname , setBusinessName] = useState(null);

  useEffect(() => {
    const UserName = localStorage.getItem("userEmail")
    setUserName(UserName)
  })

  useEffect(() => {
    const BusinessName = localStorage.getItem("businessname")
    setBusinessName(BusinessName)
  })

  return (
    <div className="bsAccount">
      <SidebarMenu />
      <div className="bsAccount-container">
        <h2 className="intelli-flow-right-side-headline">Account Settings</h2>
        <div className="bsCard-top">
          <p>Name</p>
          <h6>{businessname}</h6>
          <p>Account ID</p>
          <h6>Nano ID</h6>
          <p>Billing Email</p>
          <h6>{username}</h6>
          <p>Instance Regions</p>
          <h6>EU / US /India</h6>
        </div>
        <div className="bsCard-bottom">
          <h6>Workflow History Retention Period</h6>
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

export default AccountSettings;
