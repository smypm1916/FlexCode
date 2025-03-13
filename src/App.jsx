import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Index from "./component/product/index";
import ProductDetail from "./component/product/ProductDetail";
import OrderComplete from "./component/order/OrderComplete";
import Order from "./component/order/Order";
import CmMain from "./component/community/CmMain";
import CmAdd from "./component/community/CmAdd";
import CmDetail from "./component/community/CmDetail";
import SignUp from "./component/account/SignUp";
import SignUpSuccess from "./component/account/SignUpSuccess";
// ---------------Hearder, Footer----------------
import Header from "./component/common/Header";
import Footer from "./component/common/Footer";
import Header from "./component/common/Header";
import CmAdd from "./component/community/CmAdd";
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
        <Route path="/detail/:product_no" element={<ProductDetail />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order-complete" element={<OrderComplete />} />
        <Route path="/community" element={<CmMain />} />
        <Route path="/CmAdd" element={<CmAdd />} />
        <Route path="/CmDetail" element={<CmDetail />} />
        <Route path="/signup-success" element={<SignUpSuccess />} />
      </Routes>
      {/* 루팅 */}

      <Footer />
    </Router>
  );
}

export default App;
