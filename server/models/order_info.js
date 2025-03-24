const oracledb = require("../config/oracledb");

/**
 * order_info 테이블
 * order_no(pk) : number(3)
 * user_email(fk) : varchar2(100) / user_account
 * total_price : number(10)
 * order_date : timestamp
 * order_state : number(5) 1=주문완료,0=주문취소
 */




const order_info = {
  tableName: "ORDER_INFO",
  columns: {
    order_no: "ORDER_NO",
    user_email: "USER_EMAIL",
    total_price: "TOTAL_PRICE",
    order_date: "ORDER_DATE",
    order_state: "ORDER_STATE",
  },
};

module.exports = order_info;
