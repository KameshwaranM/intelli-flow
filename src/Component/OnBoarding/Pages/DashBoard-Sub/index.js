import "./index.css";
import logo from "../../../Assests/auto-intelli-logo.png";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const DashboardSidebar = () => {
  return (
    <div className="dashboard-Sidebar-cont">
      <div>
        <img className="dashboard-logo-image" alt="logo-image" src={logo} />
      </div>
      <div style={{ marginTop: "20px" }}>
        <Sidebar>
          <Menu
            menuItemStyles={{
              button: {
                // the active class will be added automatically by react router
                // so we can use it to style the active menu item
                [`&.active`]: {
                  backgroundColor: "#13395e",
                  color: "#b6c8d9",
                },
              },
            }}
          >
            <MenuItem>
              <Link to="/documentation">Documentation</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/calendar">Calendar</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/ecommerce">E-commerce</Link>
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
      <div className="dashboard-Sidebar-Bottom">
        <div className="dashboard-Sidebar-Account">
          <Sidebar>
            <Menu>
              <MenuItem>
                <Link to="/add-user">
                  <FaUserCircle /> Add User
                </Link>
              </MenuItem>
            </Menu>
          </Sidebar>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
