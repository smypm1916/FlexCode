import { useNavigate } from "react-router-dom";
import Searchbox from "../common/Searchbox";
import Category from "./Category";
import EventBanner from "./EventBanner";
import Pick from "./Pick";
import Header from "../common/Header";
import Footer from "../common/Footer";

const Wrapper = styled.div`
  display: column;
  width: 100vw;
  align-items: center;
`;

// 상품 상태 관리
const [products, setProducts] = useState([]);

const Index = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Header />
      <EventBanner />
      <Searchbox />
      <Category />
      <Pick />
      <h1>productListsWIP</h1>
      {/* <ProductLists /> */}

      <Footer />
    </Wrapper>
  );
};

export default Index;
