import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./component/account/SignUp";
import Footer from "./component/common/Footer";
import Header from "./component/common/Header";
import Index from "./component/product/Index";
import ProductDetail from "./component/product/ProductDetail";
import CmMain from "./component/community/CmMain";
import ProductLists from "./component/product/ProductLists";
import CmAdd from "./component/community/CmAdd";

function App() {
  return (
    <Router>
      <Header />
      {/* 루팅 */}
      <Routes>
        <Route path="/" element={<Index />} />
        {/* <Route path="/signup" element={<SignUp />} /> */}
        {/* <Route path="/detail/:product_no" element={<ProductDetail />} /> */}
        {/* <Route path="/order" element={<Order />} /> */}
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
