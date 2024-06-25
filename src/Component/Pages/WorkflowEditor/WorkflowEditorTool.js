import React from 'react';
import Sidebar from "../../Sidebar/Sidebar";
import Workflowsapp from '../../WorkFlowEditor/App';


const WorkFlowEditorTool = () => {

    return (
      <div>
        <Sidebar />
        <div>
          <React.StrictMode>
            <Workflowsapp />
          </React.StrictMode>
        </div>
      </div>
    );
  };
  
  export default WorkFlowEditorTool;