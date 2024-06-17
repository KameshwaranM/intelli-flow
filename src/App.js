import Rout from "./All-Routes/Route";
import { ThemeContextProvider } from "./Component/Theme/Theme";
// import Workflowsapp from "./Component/WorkFlowEditor/App";

function App() {
  return (
    <div>
      <ThemeContextProvider>
        <Rout />
        {/* <Workflowsapp /> */}
      </ThemeContextProvider>
    </div>
  );
}

export default App;
