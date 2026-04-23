import { useState } from "react";

export default function BasicAddition({ setView }) {
  const [number1, setNumber1] = useState();
  const [number2, setNumber2] = useState();
  const handleSum = () => {
    const sum = Number(number1) + Number(number2);
    alert("Result: " + sum);
  };
  return (
    <section id="center">
      <div>
        <label>Number 1</label>
        <input
          type="number"
          value={number1 || ""}
          onChange={(e) => setNumber1(e.target.value)}
        />
      </div>
      <div>
        <label>Number 2</label>
        <input
          type="number"
          value={number2 || ""}
          onChange={(e) => setNumber2(e.target.value)}
        />
      </div>
      <button onClick={handleSum}>Sum</button>
      <br />
      <button onClick={() => setView(false)}>Back</button>
    </section>
  );
}
