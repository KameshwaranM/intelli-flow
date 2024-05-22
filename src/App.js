import Rout from "./All-Routes/Route";
import { ThemeContextProvider } from "./Component/Theams/Theam";

function App() {
  return (
    <div>
      <ThemeContextProvider>
        <Rout />
      </ThemeContextProvider>
    </div>
  );
}

export default App;
