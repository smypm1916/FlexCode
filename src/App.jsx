import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./component/account/SignUp";
import SignUpSuccess from "./component/account/SignUpSuccess";
import Footer from "./component/common/Footer";
import Header from "./component/common/Header";
import ScrollToTop from "./component/common/ScrollToTop";
import CmAdd from "./component/community/CmAdd";
import CmDetail from "./component/community/CmDetail";
import CmMain from "./component/community/CmMain";
import DeleteUserCheck from "./component/myPage/DeleteUserCheck";
import ModifyUserProfile from "./component/myPage/ModifyUserProfile";
import MyPageMain from "./component/myPage/MyPageMain";
import UserCommunityAdd from "./component/myPage/UserCommunityAdd";
import UserCommunityDetail from "./component/myPage/UserCommunityDetail";
import UserCommunityList from "./component/myPage/UserCommunityList";
import UserOrderList from "./component/myPage/UserOrderList";
import Order from "./component/order/Order";
import OrderComplete from "./component/order/OrderComplete";
import Index from "./component/product/Index";
import ProductInfo from "./component/product/ProductInfo";

function App() {
  return (
    <Router>
      <Header />
      <ScrollToTop />
      {/* 루팅 */}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/detail/:product_no" element={<ProductInfo />} />
        <Route path="/order/:tempOrderId" element={<Order />} />
        <Route path="/order-complete/:orderNo" element={<OrderComplete />} />
        <Route path="/community" element={<CmMain />} />
        <Route path="/CmAdd" element={<CmAdd />} />
        <Route path="/CmDetail/:id" element={<CmDetail />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup-success" element={<SignUpSuccess />} />
        <Route path="/mypage" element={<MyPageMain />} />
        <Route path="/modifyUser" element={<ModifyUserProfile />} />
        <Route path="/deleteAccount" element={<DeleteUserCheck />} />
        <Route path="/userCommunity-list" element={<UserCommunityList />} />
        <Route path="/userCommunity_detail/:id" element={<UserCommunityDetail />} />
        <Route path="/userCommunity_add" element={<UserCommunityAdd />} />
        <Route path="/userOrder-list" element={<UserOrderList />} />
      </Routes>
      {/* 루팅 */}

      <Footer />
    </Router>
  );
}

export default App;
