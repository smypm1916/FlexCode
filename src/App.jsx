import { useState } from 'react';
import './App.css';
import Footer from './component/layout/Footer';
import Header from './component/layout/Header';
import Index from './component/product';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Index />
      <Footer />
    </>
  )
}

export default App;
