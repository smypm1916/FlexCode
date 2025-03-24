const express = require("express");
const router = express.Router();
// const orderController = require("../controller/order");


// 주문 취소
router.put('/cancel/:tempOrderId', async (req, res) => {
   try {
      const connection = await oracledb.getConnection();
      const orderCancelSql = `
      UPDATE ORDER_INFO SET ORDER_STATE=:order_state WHERE ORDER_NO=:order_no
      `;
      const cancelResult = await connection.execute(orderCancelSql, {
         order_state: 0,
         orde_no: req.params.order_no,
      });
      await connection.close();
      res.json({ success: true, message: "주문이 취소되었습니다." });

   } catch (error) {
      console.error("주문 취소 오류:", error);
      if (connection) await connection.rollback();
      res.status(500).json({ success: false, message: "주문 취소 처리 중 오류 발생" });
   }
});

// 주문 정보 등록(결제)
router.post('/complete/:tempOrderId', async (req, res) => {
   try {
      const connection = await oracledb.getConnection();

      const { tempOrderId, from, checkedProducts, product, totalPrice } = req.body;
      const userEmail = req.session?.user?.email || "guest@example.com";
      const now = new Date();

      // 주문번호 시퀀스 사용 (예: ORDER_NO_SEQ.nextval)
      const orderInsertSql = `
      INSERT INTO ORDER_INFO (ORDER_NO, USER_EMAIL, TOTAL_PRICE, ORDER_DATE, ORDER_STATE)
      VALUES (ORDER_NO_SEQ.nextval, :email, :totalPrice, :orderDate, 1)
      RETURNING ORDER_NO INTO :orderNo
    `;

      const orderResult = await connection.execute(orderInsertSql, {
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
         await connection.execute(itemInsertSql, {
            orderNo,
            productNo: item.product_no || product.PRODUCT_NO,
            productPrice: item.product_price || product.PRODUCT_PRICE,
            optionNo: item.option_no || item.OPTION_NO,
            optionPrice: item.option_price || item.OPTION_PRICE,
            quantity: item.quantity
         });
      }

      await connection.commit();
      res.json({ success: true, message: "결제 및 주문 저장 완료", orderNo });

   } catch (err) {
      console.error("결제 처리 오류:", err);
      await connection.rollback();
      res.status(500).json({ success: false, message: "결제 처리 중 오류 발생" });
   } finally {
      await connection.close();
   }
});

// 주문정보 조회
router.get('/receipt/:tempOrderId', async (req, res) => {
   const { tempOrderId } = req.params;
   try {
      const connection = await oracledb.getConnection();

      const [infoResult] = await connection.execute(
         `SELECT * FROM ORDER_INFO WHERE ORDER_NO = :orderNo`,
         [tempOrderId],
         { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );

      const itemsResult = await connection.execute(
         `SELECT * FROM ORDER_ITEMS WHERE ORDER_NO = :orderNo`,
         [tempOrderId],
         { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );

      res.json({
         success: true,
         orderInfo: infoResult.rows[0],
         orderItems: itemsResult.rows,
      });

      await connection.close();
   } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: '주문 상세 조회 실패', error: err.message });
   }
});

module.exports = router;
