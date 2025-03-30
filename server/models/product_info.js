const oracledb = require("oracledb");
const { executeQuery, dbConfig } = require('../config/oracledb');


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
async function getAllProducts(page, limit, keyword = "", category = "") {
  const offset = Math.max((Number(page) - 1) * Number(limit), 0);

  let query = `SELECT * FROM PRODUCT_INFO WHERE 1=1`;
  const binds = {};

  if (keyword) {
    query += ` AND UPPER(PRODUCT_NAME) LIKE UPPER(:keyword)`;
    binds.keyword = `%${keyword}%`;
  }

  if (category) {
    query += ` AND PRODUCT_TYPE = :category`;
    binds.category = category;
  }

  query += ` ORDER BY PRODUCT_DATE DESC OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY`;
  binds.offset = offset;
  binds.limit = Number(limit);

  try {
    const rows = await executeQuery(query, binds, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });
    return rows;
  } catch (error) {
    console.error("getAllProducts failed", error);
    throw error;
  }
}

// 단일 상품 상세 조회
async function getProductDetail(product_no) {
  const query = `SELECT * FROM PRODUCT_INFO where PRODUCT_NO= :product_no`;
  const binds = { product_no };
  try {
    const result = await executeQuery(query, binds, {
      outFormat: oracledb.OUT_FORMAT_OBJECT
    });
    console.log('detail read success!!!', result);
    return result;
  }
  catch (error) {
    console.error(error);
    throw error;
  }
}

// 상품 등록
async function regProduct(products) {
  if (!Array.isArray(products) || products.length === 0) {
    throw new Error("Invalid product data");
  }

  const query = `INSERT INTO PRODUCT_INFO(PRODUCT_NO, PRODUCT_TYPE, PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_DATE, PRODUCT_IMG) 
                 VALUES (product_no_seq.nextVal, :product_type, :product_name, :product_price, SYSDATE, :product_img)`;

  try {
    for (const product of products) {
      const binds = {
        product_type: product.product_type || "",
        product_name: product.product_name || "",
        product_price: Number(product.product_price) || 0,
        product_img: product.product_img || ""
      };
      await executeQuery(query, binds); // 개별 실행
    }
    console.log("✅ All products inserted successfully");
  } catch (error) {
    console.error("❌ product insert failed", error);
    throw error;
  }
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

// 상품 업데이트
async function updateProductByPk(product_no, product_img) {
  const updateQuery = `
    UPDATE PRODUCT_INFO 
    SET PRODUCT_IMG = :product_img 
    WHERE PRODUCT_NO = :product_no
  `;

  // 👇 NJS-011 방지를 위해 type과 val을 모두 명시적으로 지정
  const binds = {
    product_img: {
      val: String(product_img),          // 반드시 문자열
      type: oracledb.STRING
    },
    product_no: {
      val: Number(product_no),           // 반드시 숫자
      type: oracledb.NUMBER
    }
  };

  try {
    const result = await executeQuery(updateQuery, binds);
    console.log("product update success at model");
    return result;
  } catch (error) {
    console.error("product update failed at model");
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
  getAllProducts, getProductDetail, regProduct, deleteProductByPk, getCategories, updateProductByPk
};
