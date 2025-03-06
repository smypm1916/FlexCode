import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./component/common/Footer";
import Header from "./component/common/Header";
import Index from "./component/product/Index";
// import ProductDetail from "./component/product/ProductDetail";
// import Order from "./component/order/Order";
// import OrderComplete from "./component/order/OrderComplete";
// import LoginModal from "./component/account/LoginModal";
import SignUp from "./component/account/SignUp";

function App() {
  return (
    <Router>
      <Header />

      {/* 루팅 */}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/product_no=/:id" element={<ProductDetail />} /> */}
        {/* <Route path="/order" element={<Order />} /> */}
        {/* <Route path="/order/:id" element={<OrderComplete />} /> */}
      </Routes>
      {/* 루팅 */}

      <Footer />
    </Router>
  );
}

export default App;
