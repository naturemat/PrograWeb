import { useState } from 'react'
import './App.css'

function App() {
  const [view, setView] = useState(false);
  const [number1, setNumber1] = useState();
  const [number2, setNumber2] = useState();

  const handleSum = () => {
    const sum = Number(number1) + Number(number2);
    alert("Result: " + sum);
  };

  return (
    <div>
      <h1>Home page</h1>

      <button onClick={() => setView(true)}>
        Option 1
      </button>
      {view === true && (
        <section id="center">
          <div>
            <label>Number 1</label>
            <br />
            <input
              type="number"
              value={number1 || ""}
              onChange={(e) => setNumber1(e.target.value)}
            />
          </div>
          <br />

          <div>
            <label>Number 2</label>
            <br />
            <input
              type="number"
              value={number2 || ""}
              onChange={(e) => setNumber2(e.target.value)}
            />
          </div>
          <br />

          <button onClick={handleSum}>Sum</button>
        </section>
      )}


    </div>
  )
}

export default App
