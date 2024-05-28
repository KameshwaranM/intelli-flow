import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "../Component/OnBoarding/Pages/LandingPage";
import CheckYourEmail from "../Component/OnBoarding/Pages/CheckEmail";
import SetPassword from "../Component/OnBoarding/Pages/SetPassword";
import SelectRegion from "../Component/OnBoarding/Pages/Region";
import EnterEmail from "../Component/OnBoarding/Pages/ForgotPassword/EnterEmail/EnterEmail";
import VerifyEmail from "../Component/OnBoarding/Pages/ForgotPassword/VerifyEmail/VerifyEmail";
import CreatePassword from "../Component/OnBoarding/Pages/ForgotPassword/CreatePassword/CreatePassword";
import SetRegion from "../Component/OnBoarding/Pages/Set-Region";
import Login from "../Component/OnBoarding/Pages/Login/Login";
import SignUP from "../Component/OnBoarding/Pages/Sign-Up";
import FirstLogin from "../Component/FirstLogin/FirstLogin";
import Dashboard from "../Component/Pages/Dashboard/Dashboard";
import Sidebar from "../Component/Sidebar/Sidebar";
import WorkflowDashboard from "../Component/Pages/WorkflowDashboard/WorkflowDashboard";
import WorkFlowEditor from "../Component/WorkFlowEditor";
import BusinessSettingsAccount from "../Component/Pages/Business-Settings-Account/Business-Settings-Account";
import BusinessSettingsProjects from "../Component/Pages/Business-Settings-Projects/Business-Settings-Projects";
import BusinessSettingsMember from "../Component/Pages/Business-Settings-Members/Business-Settings-Members";
import BusinessSettingsBilling from "../Component/Pages/Business-Settings-Billing/Business-Settings-Billing";
import BusinessSettingsBillingUpgrade from "../Component/Pages/Business-Settings-Billing-Upgrade/Business-Settings-Billing-Upgrade";

function Rout() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />

          {/* User OnBoarding */}
          <Route path="/SignUp" element={<SignUP />} />
          <Route path="/verify_code" element={<CheckYourEmail />} />
          <Route path="/Create_Password" element={<SetPassword />} />
          <Route path="/Select_Region/:id" element={<SelectRegion />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ForgotPassword" element={<EnterEmail />} />
          <Route path="/Verify_user_code" element={<VerifyEmail />} />
          <Route path="/Reset_Password" element={<CreatePassword />} />
          <Route path="/Set_Region/:id" element={<SetRegion />} />

          {/* Tool */}
          <Route path="/Create-workflow" element={<FirstLogin />} />
          <Route path="/Sidebar" element={<Sidebar />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Workflow_Dashboard" element={<WorkflowDashboard />} />
          <Route path="/Workflow_Editor" element={<WorkFlowEditor />} />
          {/* BusinessName Settings */}
          <Route path="/BusinessName/Settings/Account" element={<BusinessSettingsAccount />} />
          <Route path="/BusinessName/Settings/Project" element={<BusinessSettingsProjects />} />
          <Route path="/BusinessName/Settings/Members" element={<BusinessSettingsMember />} />
          <Route path="/BusinessName/Settings/Billing" element={<BusinessSettingsBilling />} />
          <Route path="/BusinessName/Settings/Billing/Upgrade" element={<BusinessSettingsBillingUpgrade />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Rout;
