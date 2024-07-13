import { useState } from "react";
import { Button } from "./components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="bg-background">
      <h1>Vite + React</h1>
      <Button onClick={() => setCount((count) => count + 1)}>up</Button>
      <Button onClick={() => setCount((count) => count - 1)}>down</Button>
      <p className="text-red-500">count is {count}</p>
    </main>
  );
}

export default App;
