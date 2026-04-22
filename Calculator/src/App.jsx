import { useState } from 'react'
import './App.css'

function App() {
  const [view, setView] = useState(false);
  const [number1, setNumber1] = useState();
  const [number2, setNumber2] = useState();
  const [input, setInput] = useState("");

  const handleSum = () => {
    const sum = Number(number1) + Number(number2);
    alert("Result: " + sum);
  };

  const addValue = (value) => {
    setInput((prev) => prev + value);
  };

  const calculate = () => {
    const result = eval(input);
    setInput(result.toString());
  };

  const removeAll = () => {
    setInput("");
  };

  const deleteNumber = () => {
    setInput(input.slice(0, -1));
  };


  return (
    <div>
      {view === "addition" ? (
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
          <br />
          <button onClick={() => setView(false)}>Back</button>
        </section>
      ) : view === "calculator" ? (
        <div>
          <h1>Calculator page</h1>
          <div>
            <input
              type="text"
              value={input}
              readOnly
            />
          </div>
          <br />
          <button onClick={deleteNumber}>D</button>
          <button onClick={() => addValue("/")}>/</button>
          <button onClick={() => addValue("*")}>*</button>
          <button onClick={removeAll}>Remove</button>
          <br />
          <button onClick={() => addValue("7")}>7</button>
          <button onClick={() => addValue("8")}>8</button>
          <button onClick={() => addValue("9")}>9</button>
          <button onClick={() => addValue("-")}>-</button>
          <br />
          <button onClick={() => addValue("4")}>4</button>
          <button onClick={() => addValue("5")}>5</button>
          <button onClick={() => addValue("6")}>6</button>
          <button onClick={() => addValue("+")}>+</button>
          <br />
          <button onClick={() => addValue("1")}>1</button>
          <button onClick={() => addValue("2")}>2</button>
          <button onClick={() => addValue("3")}>3</button>
          <br />
          <button onClick={() => addValue("0")}>0</button>
          <button onClick={calculate}>=</button>
          <br />
          <button onClick={() => setView(false)}>Back</button>
        </div>
      ) : (
        <div>

          <h1>Home page</h1>

          <button onClick={() => setView("addition")}>
            Option 1
          </button>
          <br />
          <button onClick={() => setView("calculator")}>
            Option 2
          </button>
        </div>
      )
      }


    </div >
  )
}


export default App
