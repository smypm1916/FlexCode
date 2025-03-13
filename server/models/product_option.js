const { log } = require("winston");
const { dbConfig, executeQuery } = require("../config/oracledb");
const oracledb = require('oracledb');

// create sequence option_no_seq;
/**
 * product_option 테이블
 * option_no(pk) : number(3)
 * product_no(fk) : number(3)
 * option_title : varchar2(100)
 * option_price : number(10)
 * option_state : number(5)
 */

// 옵션 등록
async function regOption(optProduct) {
  const { product_no, option_title, option_price, option_state } = optProduct;
  const query = `INSERT INTO PRODUCT_OPTION(OPTION_NO,PRODUCT_NO,OPTION_TITLE,OPTION_PRICE,OPTION_STATE) VALUES(option_no_seq.nextVal,:product)no,:option_title,:option_price,:option_state)`;
  const binds = {
    "PRODUCT_NO": product_no,
    "OPTION_TITLE": option_title,
    "OPTION_PRICE": option_price,
    "OPTION_STATE": option_state,
  };
  try {
    const result = await executeQuery(query, binds);
    console.log('option insert success!!!');
  } catch (error) {
    console.error('option register failed', error);
    throw error;
  }
  return;
}

// 옵션 삭제
async function deleteOption(option_no) {
  const query = 'DELETE FROM PRODUCT_OPTION WHERE OPTION_NO= :option_no';
  const binds = { option_no };
  try {
    const result = await executeQuery(query, binds);
    console.log('option delete success!!!');
  } catch (error) {
    console.error('option delete failed', error);
    throw error;
  }
  return;
}

// 옵션 조회
async function getOptionProduct(product_no) {
  const query = 'SELECT * FROM PRODUCT_OPTION WHERE PRODUCT_NO= :product_no';
  const binds = { product_no };
  try {
    const result = await executeQuery(query, binds);
    console.log('getOptionProduct success!!!');
    return result;
  } catch (error) {
    console.error('getOptionProduct failed', error);
    throw error;
  }
}


const product_option = {
  tableName: "PRODUCT_OPTION",
  columns: {
    option_no: "OPTION_NO",
    product_no: "PRODUCT_NO",
    option_title: "OPTION_TITLE",
    option_price: "OPTION_PRICE",
    option_state: "OPTION_STATE",
  },
};

module.exports = { regOption, deleteOption, getOptionProduct };
