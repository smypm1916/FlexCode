const dbConfig = require("../config/oracledb");
const oracledb = require("oracledb");
const { executeQuery } = require('../config/oracledb');


/**
 * product_info 테이블
 * product_no(pk) : number(3)
 * product_type : varchar2(50)
 * product_name : varchar2(100)
 * product_price : number(10)
 * product_date : timestamp
 * product_img : varchar2(255)
 */

//  상품 전체 조회
async function getAllProducts(page, limit) {
  const offset = Math.max((Number(page) - 1) * Number(limit), 0);
  const query = `SELECT * FROM PRODUCT_INFO OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY`;
  const binds = { offset, limit };
  try {
    const rows = await executeQuery(query, binds, {
      outFormat: oracledb.OUT_FORMAT_OBJECT
    });
    console.log('get products list success!!!', rows);
    return rows;
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
    const result = await executeQuery(query, binds);
    console.log('detail read success!!!');
    return result.rows;
  }
  catch (error) {
    console.error(error);
    throw error;
  }
}

// 상품 등록
async function regProduct(product) {
  // destructuring
  const { product_type, product_name, product_price, product_img } = product;
  const query = `INSERT INTO PRODUCT_INFO(PRODUCT_NO,PRODUCT_TYPE,PRODUCT_NAME,PRODUCT_PRICE,PRODUCT_DATE,PRODUCT_IMG) VALUES(product_no_seq.nextVal,:product_type,:product_name,:product_price,SYSDATE,:product_img)`;
  const binds = {
    product_type,
    product_name,
    product_price,
    product_img,
    // PRODUCT_TYPE: product_type,
    // PRODUCT_NAME: product_name,
    // PRODUCT_PRICE: product_price,
    // PRODUCT_IMG: product_img,
  };

  try {
    const result = await executeQuery(query, binds);
    console.log('product insert success');
  }
  catch (error) {
    console.error(error);
    throw error;
  }
  return;
}

// 상품 삭제
async function deleteProductByPk(product_no) {
  const query = `DELETE FROM PRODUCT_INFO WHERE PRODUCT_NO= :product_no`
  const binds = { product_no };
  try {
    const result = await executeQuery(query, binds);
    console.log('Delete Success!!!');
  } catch (error) {
    console.log('Delete Failed', error);
  }
  return;
}

// 카테고리별 상품조회
async function getCategories() {
  //  병렬 실행 방지
  await executeQuery("ALTER SESSION DISABLE PARALLEL QUERY", {});
  // 중복 제거 + 데이터 타입 변환
  const query = `SELECT DISTINCT TO_CHAR(PRODUCT_TYPE) AS PRODUCT_TYPE FROM PRODUCT_INFO`;
  try {
    const rows = await executeQuery(query, {}, {
      outFormat: oracledb.OUT_FORMAT_OBJECT
    });
    console.log('get categories success!!!', rows);
    return rows;
  } catch (error) {
    console.error('category get failed', error);
    throw error;
  }
}


const product_info = {
  tableName: "PRODUCT_INFO",
  columns: {
    product_no: "PRODUCT_NO",
    product_type: "PRODUCT_TYPE",
    product_name: "PRODUCT_NAME",
    product_price: "PRODUCT_PRICE",
    product_date: "PRODUCT_DATE",
    product_img: "PRODUCT_IMG",
  },
};

module.exports = {
  getAllProducts, getProductDetail, regProduct, deleteProductByPk, getCategories
};
