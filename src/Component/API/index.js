import Sidebar from "../Sidebar/Sidebar";

function UIComponent() {
    return (
      <div>
        <Sidebar />
        <div>
        <iframe
          src="http://localhost:3001"
          title="App 2"
          style={{ width: '100%', height: '99vh', border: 'none' }}
        />
        </div>
      </div>
    );
  }
  
  export default UIComponent;