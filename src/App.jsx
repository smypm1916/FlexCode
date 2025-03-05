import { useState } from "react";
import "./App.css";
import Index from "./component/product/index";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // React Router 추가

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        {/* 필요한 다른 라우트를 여기에 추가할 수 있습니다. */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
