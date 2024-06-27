import React from 'react';
import Sidebar from "../../Sidebar/Sidebar";
import Workflowsapp from '../../WorkFlowEditor/App';


const WorkFlowEditorTool = () => {

    return (
      <div style={{display:"flex", width:"100%"}}>
        <div>
          <Sidebar />
        </div>
        <div style={{width:"100%"}}>
          <React.StrictMode>
            <Workflowsapp />
          </React.StrictMode>
        </div>
      </div>
    );
  };
  
  export default WorkFlowEditorTool;