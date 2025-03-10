import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./component/common/Footer";
import Header from "./component/common/Header";
import Index from "./component/product/index";
import SignUp from "./component/account/SignUp";
import ProductDetail from "./component/product/ProductDetail";
import CmMain from "./component/community/CmMain";
import CmAdd from "./component/community/CmAdd";

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
        {/* <Route path="/signup" element={<SignUp />} /> */}
        {/* <Route path="/community" element={<CmMain />} /> */}
        {/* <Route path="/CmAdd" element={<CmAdd />} /> */}
      </Routes>
      {/* 루팅 */}

      <Footer />
    </Router>
  );
}

export default App;
