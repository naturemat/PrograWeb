import { useState } from "react";

function Calculator({ setView }) {
  const [input, setInput] = useState("");

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
      <h1>Calculator page</h1>
      <div>
        <input type="text" value={input} readOnly />
      </div>
      <br /> <br />
      <section>
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
      </section>
      <br /> <br />
      <button onClick={() => setView(false)}>Back</button>
    </div>
  );
}

export default Calculator;
