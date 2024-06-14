import React from 'react';
import SidebarMenu from "../Sidebar/Sidebar";
import Workflowsapp from "../WorkFlowEditor/App";

function SIDEBARUIDEMO() {
  return (
    <>
    <div>
      <SidebarMenu />
      <div>
      <React.StrictMode>
            <Workflowsapp />
          </React.StrictMode>
      </div>
    </div>
    </>
  );
}

export default SIDEBARUIDEMO;
