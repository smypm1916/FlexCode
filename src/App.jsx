import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./component/account/SignUp";
import SignUpSuccess from "./component/account/SignUpSuccess";
import Footer from "./component/common/Footer";
import Header from "./component/common/Header";
import CmAdd from "./component/community/CmAdd";
import Index from "./component/product/index";
import CmMain from "./component/community/CmMain";
import Order from "./component/order/Order";
import OrderComplete from "./component/order/OrderComplete";
import ProductDetail from "./component/product/ProductDetail";

function App() {
  return (
    <Router>
      <Header />
      {/* 루팅 */}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/detail/:PRODUCT_NO" element={<ProductDetail />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order-complete" element={<OrderComplete />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/community" element={<CmMain />} />
        <Route path="/CmAdd" element={<CmAdd />} />
        <Route path="/CmDetail" element={<CmDetail />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup-success" element={<SignUpSuccess />} />
      </Routes>
      {/* 루팅 */}

      <Footer />
    </Router>
  );
}

export default App;
