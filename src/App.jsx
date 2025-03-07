import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./component/common/Footer";
import Header from "./component/common/Header";
import Index from "./component/product/Index";
import SignUp from "./component/account/SignUp";
import ProductDetail from "./component/product/ProductDetail";
import ProductLists from "./component/product/ProductLists";

function App() {
  return (
    <Router>
      <Header />
      {/* 루팅 */}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/product_no=/:id" element={<ProductDetail />} />
        {/* <Route path="/order" element={<Order />} /> */}
        {/* <Route path="/order/:id" element={<OrderComplete />} /> */}
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      {/* 루팅 */}

      <Footer />
    </Router>
  );
}

export default App;
