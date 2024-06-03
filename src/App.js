import Rout from "./All-Routes/Route";
import { ThemeContextProvider } from "./Component/Theme/Theme";

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
