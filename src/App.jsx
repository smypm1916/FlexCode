import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./component/account/SignUp";
import SignUpSuccess from "./component/account/SignUpSuccess";
import Footer from "./component/common/Footer";
import Header from "./component/common/Header";
import CmAdd from "./component/community/CmAdd";
import CmDetail from "./component/community/CmDetail";
import CmMain from "./component/community/CmMain";
import DeleteUserCheck from "./component/myPage/DeleteUserCheck";
import Order from "./component/order/Order";
import OrderComplete from "./component/order/OrderComplete";
import Index from "./component/product";
// import ProductDetail from "./component/product/ProductDetail";
import MyPageMain from "./component/myPage/myPageMain";
import ModifyUserProfile from "./component/myPage/ModifyUserProfile";
import ProductInfo from "./component/product/ProductInfo";
import UserCommunityList from "./component/myPage/UserCommunityList";
import UserCommunityDetail from "./component/myPage/UserCommunityDetail";

function App() {
  return (
    <Router>
      <Header />
      {/* 루팅 */}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/detail/:product_no" element={<ProductInfo />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order-complete" element={<OrderComplete />} />
        <Route path="/community" element={<CmMain />} />
        <Route path="/CmAdd" element={<CmAdd />} />
        <Route path="/CmDetail/:id" element={<CmDetail />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup-success" element={<SignUpSuccess />} />
        <Route path="/mypage" element={<MyPageMain />} />
        <Route path="/modifyUser" element={<ModifyUserProfile />} />
        <Route path="/deleteAccount" element={<DeleteUserCheck />} />
        <Route path="/userCommunity-list" element={<UserCommunityList />} />
        <Route
          path="/userCommunity_detail/:id"
          element={<UserCommunityDetail />}
        />
      </Routes>
      {/* 루팅 */}

      <Footer />
    </Router>
  );
}

export default App;
