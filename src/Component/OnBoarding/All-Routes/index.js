import React from "react";
import { Routes, Route } from 'react-router-dom';
import Landing from "../Pages/LandingPage";
import DemoPage from "../Pages/RequestDemo";
import SelectRegion from "../Pages/Region";
import SetPassword from "../Pages/SetPassword"; 
import CreatePassword from "../Pages/ForgotPassword/CreatePassword/CreatePassword";
import EnterEmail from "../Pages/ForgotPassword/EnterEmail/EnterEmail";
import VerifyEmail from "../Pages/ForgotPassword/VerifyEmail/VerifyEmail";
import SetRegion from "../Pages/Set-Region";
import CheckYourEmail from "../Pages/CheckEmail";
import Login from "../Login/Login";
import SignUP from "../Sign-Up";
// import Sign from "../Pages/SignUp/SignUp";
// import SignIn from "../Pages/SignIn/SignIn";
// import SignUp from "../Pages/SignUp/SignUp";
// import EmailVerify from "../Pages/EmailVerify";
// import ExpiredEmail from "../Pages/ExpiredEmail";
// import ExpireUser from "../Pages/ExpiredEmail/Expired/ExpiredUser";


function Sample() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/Request-a-Demo" element={<DemoPage />} />
                <Route path="/SignUp" element={<SignUP />} />
                <Route path="/verify_code" element={<CheckYourEmail />} />
                <Route path="/Create_Password" element={<SetPassword />} />
                <Route path="/Select_Region/:id" element={<SelectRegion />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/ForgotPassword" element={<EnterEmail />} />
                <Route path="/Verify_user_code" element={<VerifyEmail />} />
                <Route path="/Reset_Password" element={<CreatePassword />} />
                <Route path="/Set_Region/:id" element={<SetRegion />} />
                {/* <Route path="/Expired_Email" element={<ExpiredEmail />} /> */}
                {/* <Route path="/Expired_User" element={<ExpireUser />} /> */}
                {/* <Route path="/Login" element={<SignIn />} /> */}
                {/* <Route path="/SignUp" element={<SignUp />} /> */}
                {/* <Route path="/CustomizedTables" element={<CustomizedTables />} /> */}
                {/* <Route path="/Dashboard_Sidebar" element={< />} /> */}
                {/* <Route path="/Email_Verify" element={<EmailVerify />} /> */}
            </Routes>
        </div>
    );
}

export default Sample;


            {/* <Route path="/" element={<Landing />} />
                <Route path="/Request-a-Demo" element={<DemoPage />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/Email_Verify" element={<EmailVerify />} />
                <Route path="/Invalid_User_Token" element={<ExpireUser />} />
                <Route path="/Create_Password" element={<SetPassword />} />
                <Route path="/Select_Region/:id" element={<SelectRegion />} />
                <Route path="/Login" element={<SignIn />} />
                <Route path="/Set_Region" element={<SetRegion />} />
                <Route path="/Verify_Email" element={<VerifyEmail />} />
                <Route path="/Reset_Password" element={<CreatePassword />} />
                <Route path="/Invalid_Token" element={<ExpiredEmail />} />
                <Route path="/Forgot_Password" element={<EnterEmail />} />
                <Route path="/Dashboard_Sub" element={<DashboardSub />} /> */}