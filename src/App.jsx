import { useState } from "react";
import "./App.css";
import Index from "./component/product";
import Footer from "./component/layout/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Index />
    </>
  );
}

export default App;
