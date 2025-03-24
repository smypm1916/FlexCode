const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");
const { executeQuery, dbConfig } = require('../config/oracledb');


// 주문 취소
router.put('/cancel/:tempOrderId', async (req, res) => {
   try {
      const orderCancelSql = `
      UPDATE ORDER_INFO SET ORDER_STATE=:order_state WHERE ORDER_NO=:order_no
      `;
      const cancelResult = await connection.executeQuery(orderCancelSql, {
         order_state: 0,
         order_no: req.params.order_no,
      });
      await connection.close();
      res.json({ success: true, message: "주문이 취소되었습니다." });

   } catch (error) {
      console.error("주문 취소 오류:", error);
      res.status(500).json({ success: false, message: "주문 취소 처리 중 오류 발생" });
   }
});

// 주문 정보 등록(결제)
router.post('/complete/:tempOrderId', async (req, res) => {
   try {
      const { tempOrderId, from, checkedProducts, product, totalPrice } = req.body;
      console.log('userEmail : ', req.session?.user?.email);
      let userEmail = req.body.email || req.session?.user?.email;
      const now = new Date();

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
         orderNo: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
      });

      const orderNo = orderResult.outBinds.orderNo[0];

      const itemInsertSql = `
      INSERT INTO ORDER_ITEMS (ORDER_NO, PRODUCT_NO, PRODUCT_PRICE, OPTION_NO, OPTION_PRICE, PRODUCT_QUANTITY)
      VALUES (:orderNo, :productNo, :productPrice, :optionNo, :optionPrice, :quantity)
    `;

      const items = (from === 'direct' ? checkedProducts : await getCartItems(tempOrderId));
      for (const item of items) {
         await executeQuery(itemInsertSql, {
            orderNo,
            productNo: from === 'direct' ? product.PRODUCT_NO : item.product_no,
            productPrice: from === 'direct' ? product.PRODUCT_PRICE : item.product_price,
            optionNo: item.option_no || item.OPTION_NO,
            optionPrice: item.option_price || item.OPTION_PRICE,
            quantity: item.quantity
         });
      }
      res.json({ success: true, message: "결제 및 주문 저장 완료", orderNo });

   } catch (err) {
      console.error("결제 처리 오류:", err);
      res.status(500).json({ success: false, message: "결제 처리 중 오류 발생" });
   }
});

// 주문정보 조회
router.get('/receipt/:orderNo', async (req, res) => {
   const orderNo = req.params.orderNo;
   try {
      const infoResult = await executeQuery(
         `SELECT * FROM ORDER_INFO WHERE ORDER_NO = :orderNo`,
         [orderNo],
         // { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );

      const itemsResult = await executeQuery(
         `SELECT * FROM ORDER_ITEMS WHERE ORDER_NO = :orderNo`,
         [orderNo],
         // { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );

      res.json({
         success: true,
         orderInfo: infoResult.length > 0 ? infoResult[0] : null,
         orderItems: itemsResult || [],
      });
   } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: '주문 상세 조회 실패', error: err.message });
   }
});

module.exports = router;
