import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./component/account/SignUp";
import Footer from "./component/common/Footer";
import Header from "./component/common/Header";
import CmAdd from "./component/community/CmAdd";
import CmMain from "./component/community/CmMain";
import Index from "./component/product/Index";
import ProductDetail from "./component/product/ProductDetail";
import Order from "./component/order/Order";

function App() {

  return (
    <Router>
      <Header />
      {/* 루팅 */}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/detail/:PRODUCT_NO" element={<ProductDetail />} />
        <Route path="/order" element={<Order />} />
        {/* <Route path="/order/:id" element={<OrderComplete />} /> */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/community" element={<CmMain />} />
        <Route path="/CmAdd" element={<CmAdd />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      {/* 루팅 */}

      <Footer />
    </Router>
  );
}

export default App;
