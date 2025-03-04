import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Footer from './component/common/Footer';
import Header from './component/common/Header';
import Index from './component/product/Index';
import ProductDetail from './component/product/ProductDetail';

function App() {
  return (
    <Router>
      <Header />

      {/* 루팅 */}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      {/* 루팅 */}

      <Footer />
    </Router>
  )
};

export default App;
