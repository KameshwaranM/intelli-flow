import React from "react";
import "./Business-Settings-Projects.css";
import { FaPlusCircle, FaSearch } from "react-icons/fa";
import DataTable from "react-data-table-component";
import Sidebar from "../../Sidebar/Sidebar";

const BusinessSettingsProjects = () => {
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Created",
      selector: (row) => row.created,
    },
    {
      name: "Last Updated",
      selector: (row) => row.updated,
    },
  ];

  const data = [
    {
      id: 1,
      name: "Project Name",
      created: "2024/05/09 03:15:00PM",
      updated: "2024/05/09 03:30:00PM",
    },
    {
        id: 1,
        name: "Project Name",
        created: "2024/05/09 03:15:00PM",
        updated: "2024/05/09 03:30:00PM",
      },
  ];

  return (
    <div className="bsProject">
      <Sidebar />
      <div className="bsProject-container">
        <h2>Projects</h2>
        <div className="bsSearch">
          <FaPlusCircle className="bsProjPlusIcon" />
          <form action="" className="bsProjSearchBar">
            <FaSearch className="bsProjSearch-icon" />
            <input type="text" placeholder="Search Projects" />
          </form>
        </div>
        <div className="bsProjTable">
          <DataTable columns={columns} data={data} className="dataTable" />
        </div>
      </div>
    </div>
  );
};

export default BusinessSettingsProjects;
