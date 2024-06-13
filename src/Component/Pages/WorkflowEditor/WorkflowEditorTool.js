import Sidebar from "../../Sidebar/Sidebar";


const WorkFlowEditorTool = () => {

    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <iframe
            src=""
            title="App 2"
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        </div>
      </div>
    );
  };
  
  export default WorkFlowEditorTool;