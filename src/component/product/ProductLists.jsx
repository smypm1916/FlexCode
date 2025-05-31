import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container_Style, Title } from "../../style/Common_Style";
import {
  ProductList_ItemBox,
  ProductList_Wrapper,
  System_message,
  Text_wrapper,
} from "../../style/ProductLists_Style";

const ProductLists = ({ products, loading, fetchMore, hasMore }) => {
  const navigate = useNavigate();
  const imgPath = import.meta.env.VITE_IMG_PATH;
  const loader = useRef(null);

  useEffect(() => {
    if (!hasMore || loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchMore();
      },
      { rootMargin: "20px", threshold: 1 }
    );

    if (loader.current) observer.observe(loader.current);

    return () => observer.disconnect();
  }, [fetchMore, hasMore, loading]);

  return (
    <Container_Style>
      <Title>SHOPPING</Title>
      <ProductList_Wrapper>
        {products.map((product, index) => (
          <ProductList_ItemBox
            // key={product.PRODUCT_NO}
            key={`${product.PRODUCT_NO}-${index}`}
            onClick={() => navigate(`/detail/${product.PRODUCT_NO}`)}
          >
            <img
              src={`${imgPath}/${product.PRODUCT_IMG}`}
              alt={product.PRODUCT_NAME}
            />
            <Text_wrapper>
              <h3>{product.PRODUCT_NAME}</h3>
              <p>{product.PRODUCT_TYPE}</p>
              <p>{product.PRODUCT_PRICE} 円</p>
            </Text_wrapper>
          </ProductList_ItemBox>
        ))}
        {loading && (
          <System_message>
            <p>Loading...</p>
          </System_message>
        )}
        <div ref={loader} />
      </ProductList_Wrapper>
    </Container_Style>
  );
};

export default ProductLists;
