import { useState } from "react";
import "./App.css";
import BasicAddition from "./Components/basicAdittion";
import Calculator from "./Components/calculator";

function App() {
  const [view, setView] = useState(false);

  return (
    <div>
      {view === "addition" ? (
        <BasicAddition setView={setView} />
      ) : view === "calculator" ? (
        <Calculator setView={setView} />
      ) : (
        <div>
          <h1>Home page</h1>
          <button onClick={() => setView("addition")}>Option 1</button>
          <br />
          <button onClick={() => setView("calculator")}>Option 2</button>
        </div>
      )}
    </div>
  );
}

export default App;
