import { useNavigate } from "react-router-dom";
import { Container_Style, Title } from "../../style/Common_Style";
import {
  Bucket_option,
  Bucket_Text,
  Container_Bucket,
  Text,
} from "../../style/Product_Detail_Style";
import Button from "./Button";
const CheckedProduct = ({
  mode = "detail",
  product,
  quantityHandler,
  options,
  onRemove,
  cartItems,
  updateCartQuantity,
  removeFromCart,
}) => {
  const navigate = useNavigate();

  const countUp = (OPTION_NO, currentQuantity, maxQuantity) => {
    quantityHandler(OPTION_NO, Math.min(maxQuantity, currentQuantity + 1));
  };
  const countDown = (OPTION_NO, currentQuantity) => {
    quantityHandler(OPTION_NO, Math.max(1, currentQuantity - 1));
  };

  if (mode === "detail") {
    return (
      // productInfo
      <Container_Style className="Bucket" id="Bucket_Module">
        <div>
          <Title onClick={() => navigate(`/detail/${product.PRODUCT_NO}`)}>
            {product.PRODUCT_NAME}
          </Title>
          {options.length > 0 ? (
            <>
              {options.map((option) => (
                <Container_Bucket key={option.OPTION_NO}>
                  <Bucket_Text>
                    <Text>{option.OPTION_TITLE}</Text>
                    <Text>
                      {Intl.NumberFormat("ko-KR").format(
                        options.reduce(
                          (total, opt) =>
                            total +
                            (product.PRODUCT_PRICE + opt.OPTION_PRICE),
                          0
                        )
                      )}{" "}
                      円</Text>
                    <Text>在庫: {option.OPTION_STATE} 個</Text>
                  </Bucket_Text>
                  <Bucket_option>
                    <Button
                      btnTxt="-"
                      onClick={() => countDown(option.OPTION_NO, option.quantity)}
                    />
                    <input
                      type="number"
                      min="1"
                      max={option.OPTION_STATE}
                      value={option.quantity}
                      onChange={(e) =>
                        quantityHandler(
                          option.OPTION_NO,
                          parseInt(e.target.value, 10)
                        )
                      }
                      style={{
                        outline: "none",
                        width: "50px",
                        textAlign: "center",
                        margin: "0 10px",
                      }}
                      readOnly
                    />
                    <Button
                      btnTxt="+"
                      onClick={() =>
                        countUp(
                          option.OPTION_NO,
                          option.quantity,
                          option.OPTION_STATE
                        )
                      }
                    />
                    <Button btnTxt="X" onClick={onRemove(option.OPTION_NO)} />
                  </Bucket_option>
                </Container_Bucket>
              ))}
              {/* 총 합계 금액 */}
              <div style={{ marginTop: "20px", textAlign: "right" }}>
                <Title>
                  合計:{" "}
                  {Intl.NumberFormat("ko-KR").format(
                    options.reduce(
                      (total, opt) =>
                        total +
                        (product.PRODUCT_PRICE + opt.OPTION_PRICE) *
                        opt.quantity,
                      0
                    )
                  )}{" "}
                  円
                </Title>
              </div>
            </>
          ) : (
            <p>選択されたオプションが存在しません</p>
          )}
        </div>
      </Container_Style>
    );
  } else {
    // order
    if (!cartItems || cartItems.length === 0) {
      return <p>カートが空です</p>;
    }
    const items = cartItems || [];
    return (
      <Container_Style className="Bucket noPaddingBorder">
        <Title>オプション・数量変更</Title>
        {items.map((item) => {
          const productKey = `product:${item.product_no}:option:${item.option_no}`;
          return (
            <div key={productKey}>
              <Title>{item.product_name}</Title>

              {/* 수량 변경 */}
              <Text>
                数量:{" "}
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => {
                    const newQ = parseInt(e.target.value, 10);
                    if (newQ > 0) {
                      updateCartQuantity(item.product_no, newQ);
                    }
                  }}
                  style={{ width: "50px", textAlign: "center" }}
                />
              </Text>

              <Title>
                合計:{" "}
                {((item.product_price || 0) + (item.option_price || 0)) *
                  item.quantity}
                円
              </Title>

              {/* <p>합계 금액: {(item.PRODUCT_PRICE + item.OPTION_PRICE) * item.quantity}원</p> */}

              {/* 삭제 */}
              <Button
                btnTxt="削除"
                onClick={() => removeFromCart(productKey)}
              />
            </div>
          );
        })}
      </Container_Style>
    );
  }
};

export default CheckedProduct;
