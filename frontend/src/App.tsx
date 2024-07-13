import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="card">
      <h1>Vite + React</h1>
      <button onClick={() => setCount((count) => count + 1)}>up</button>
      <button onClick={() => setCount((count) => count - 1)}>down</button>
      <p className="text-red-500">count is {count}</p>
    </main>
  );
}

export default App;
