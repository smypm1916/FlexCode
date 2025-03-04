import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Footer from './component/common/Footer';
import Header from './component/common/Header';
import Index from './component/product/Index';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
      <Footer />
    </Router>
  )
};

export default App;
