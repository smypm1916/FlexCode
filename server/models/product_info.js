const dbConfig = require("../config/oracledb");
const oracledb = require("oracledb");

/**
 * product_info 테이블
 * product_no(pk)
 * product_type
 * product_name
 * product_price
 * product_date
 * product_img
 */

//  상품 전체 조회
async function getAllProducts() {
  // let connection;
  try {
    const result = await oracledb.executeQuery('SELECT * FROM PRODUCT_INFO', [], {
      outFormat: oracledb.OUT_FORMAT_OBJECT
    });
    console.log('get products list success!!!');
    return result.rows;
  }
  catch (error) {
    console.error(error);
    throw error;
  }
}

// 단일 상품 상세 조회
async function getProductDetail(product_no) {
  const query = `SELECT * FROM PRODUCT_INFO where PRODUCT_NO= :product_no`;
  const binds = { product_no };
  try {
    const result = await oracledb.executeQuery(query, binds);
    console.log('detail read success!!!');

  }
  catch (error) {
    console.error(error);
    throw error;
  }
}

// 상품 등록
async function regProduct(product) {
  const query = `INSERT INTO PRODUCT_INFO(PRODUCT_NO,PRODUCT_TYPE,PRODUCT_NAME,PRODUCT_PRICE,PRODUCT_DATE,PRODUCT_IMG) VALUES(PRODUCT_INFO_SEQ.nextVal,:PRODUCT_TYPE,:PRODUCT_NAME,:PRODUCT_PRICE,SYSDATE,:PRODUCT_IMG)`;
  const binds = {
    PRODUCT_TYPE: product.type,
    PRODUCT_NAME: product.name,
    PRODUCT_PRICE: product.price,
    PRODUCT_IMG: product.img,
  };

  try {
    const result = await oracledb.executeQuery(query, binds);
    console.log('insert success');
  }
  catch (error) {
    console.error(error);
    throw error;
  }
}

// 카테고리별 상품조회


// const product_info = {
//   tableName: "PRODUCT_INFO",
//   columns: {
//     product_no: "PRODUCT_NO",
//     product_type: "PRODUCT_TYPE",
//     product_name: "PRODUCT_NAME",
//     product_price: "PRODUCT_PRICE",
//     product_date: "PRODUCT_DATE",
//     product_img: "PRODUCT_IMG",
//   },
// };

module.exports = {
  getAllProducts, getProductDetail, regProduct
};
