const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");
const { executeQuery, dbConfig } = require("../config/oracledb");
const redisClient = require("../config/redis");



// 주문 취소
router.put("/cancel/:orderNo", async (req, res) => {
  const orderNo = req.params.orderNo;

  try {
    const orderCancelSql = `
      UPDATE ORDER_INFO SET ORDER_STATE=:order_state WHERE ORDER_NO=:order_no
      `;
    const cancelResult = await executeQuery(orderCancelSql, {
      order_state: 0,
      order_no: orderNo,
    });

    // 주문 아이템 가져오기
    const getOrderItemsSql = `
  SELECT OPTION_NO, PRODUCT_QUANTITY
  FROM ORDER_ITEMS
  WHERE ORDER_NO = :order_no
`;

    const items = await executeQuery(getOrderItemsSql, {
      order_no: req.params.tempOrderId,
    });

    // 수량 복구
    const restoreStockSql = `
  UPDATE PRODUCT_OPTION
  SET OPTION_STATE = OPTION_STATE + :qty
  WHERE OPTION_NO = :option_no
`;

    for (const item of items) {
      await executeQuery(restoreStockSql, {
        qty: item.PRODUCT_QUANTITY,
        option_no: item.OPTION_NO,
      });
    }
    res.json({ success: true, message: "주문이 취소되었습니다." });
  } catch (error) {
    console.error("주문 취소 오류:", error);
    res
      .status(500)
      .json({ success: false, message: "주문 취소 처리 중 오류 발생" });
  }
});

// 주문 정보 등록(결제)
router.post("/pay/:tempOrderId", async (req, res) => {
  try {
    const { tempOrderId, from, checkedProducts, product, totalPrice } = req.body;
    console.log("userEmail : ", req.session?.user?.email);
    console.log(tempOrderId);
    let userEmail = req.body.email || req.session?.user?.email;
    const now = new Date();

    const items = checkedProducts;

    console.log(product);
    const pItems = product;
    // 주문 수량 검사 추가
    const validateStockSql = `SELECT OPTION_STATE FROM PRODUCT_OPTION WHERE OPTION_NO = :option_no`;
    for (const item of items) {
      const optionNo = item.option_no || item.OPTION_NO;
      const quantity = item.quantity;

      const result = await executeQuery(validateStockSql, {
        option_no: optionNo,
      });
      const stock = result[0]?.OPTION_STATE ?? 0;

      if (stock < quantity) {
        return res.status(400).json({
          success: false,
          message: `옵션 ${optionNo}의 재고가 부족합니다. 현재 재고: ${stock}, 요청 수량: ${quantity}`,
        });
      }
    }

    // 주문번호 시퀀스 사용 (예: ORDER_NO_SEQ.nextval)
    const orderInsertSql = `
       INSERT INTO ORDER_INFO (ORDER_NO, USER_EMAIL, TOTAL_PRICE, ORDER_DATE, ORDER_STATE)
       VALUES (ORDER_NO_SEQ.nextval, :email, :totalPrice, :orderDate, 1)
       RETURNING ORDER_NO INTO :orderNo
     `;

    const orderResult = await executeQuery(orderInsertSql, {
      email: userEmail,
      totalPrice,
      orderDate: now,
      orderNo: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    });

    const orderNo = orderResult.outBinds.orderNo[0];

    const itemInsertSql = `
       INSERT INTO ORDER_ITEMS (ORDER_NO, PRODUCT_NO, PRODUCT_PRICE, OPTION_NO, OPTION_PRICE, PRODUCT_QUANTITY)
       VALUES (:orderNo, :productNo, :productPrice, :optionNo, :optionPrice, :quantity)
     `;

    for (const item of items) {
      console.log('items~~~~~~~~~~~~~~~~~~~~~~~')
      console.log(item);
      await executeQuery(itemInsertSql, {
        orderNo,
        // productNo: item.product_no,
        // productPrice: item.product_price,
        // optionNo: item.option_no,
        // optionPrice: item.option_price,
        productNo: item.PRODUCT_NO,
        // productPrice: item.OPTION_PRICE,
        productPrice: pItems.PRODUCT_PRICE,
        optionNo: item.OPTION_NO,
        // optionPrice: item.OPTION_PRICE,
        optionPrice: item.OPTION_PRICE,
        quantity: item.quantity,
      });
    }

    // 주문 처리 후 옵션 재고 차감
    const updateOptionStockSql = `
       UPDATE PRODUCT_OPTION
       SET OPTION_STATE = OPTION_STATE - :qty
       WHERE OPTION_NO = :option_no
     `;

    for (const item of items) {
      await executeQuery(updateOptionStockSql, {
        qty: item.quantity,
        option_no: item.OPTION_NO,
      });
    }
    // // Redis에서 해당 유저의 장바구니 초기화
    // const cartKey = req.session?.user?.email
    //   ? `cart:${req.session.user.email}`
    //   : `cart:session_${req.sessionID}`;

    // // 장바구니 전체 삭제
    // await redisClient.del(cartKey);

    const cartKey = req.session?.user?.email
      ? `cart:${req.session.user.email}`
      : `cart:session_${req.sessionID}`;
    await redisClient.del(cartKey);


    // 응답을 한 번만 보냄
    res.json({ success: true, message: "결제 및 주문 저장 완료", orderNo });


  } catch (err) {
    // 오류 발생 시 응답을 보내기 전에 다시 응답을 보내지 않도록 처리
    console.error("결제 처리 오류:", err);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: "결제 처리 중 오류 발생" });
    }
  }
});

// 주문정보 조회
router.get("/receipt/:orderNo", async (req, res) => {
  const orderNo = req.params.orderNo;
  try {
    const infoResult = await executeQuery(
      `SELECT * FROM ORDER_INFO WHERE ORDER_NO = :orderNo`,
      [orderNo]
      // { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    const itemsResult = await executeQuery(
      `SELECT * FROM ORDER_ITEMS WHERE ORDER_NO = :orderNo`,
      [orderNo]
      // { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    console.log(" ------------- order result -------------")
    console.log(infoResult);
    console.log(itemsResult);
    res.json({
      success: true,
      orderInfo: infoResult.length > 0 ? infoResult[0] : null,
      orderItems: itemsResult || [],
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        success: false,
        message: "주문 상세 조회 실패",
        error: err.message,
      });
  }
});

module.exports = router;
