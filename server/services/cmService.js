const { executeQuery } = require("../config/oracledb");
const community_info = require("../models/community_info");

const getPosts = async () => {
  const query = `select * from ${community_info.tableName} order by ${community_info.columns.community_date} desc`;
  const results = await executeQuery(query);
  // 결과를 객체로 변환 (예시: 필드명을 실제 컬럼명에 맞게 설정)

  // 결과를 객체 형식으로 변환
  return results.map((row) => ({
    community_no: row[0], // 첫 번째 값 -> community_no
    user_nickname: row[1], // 두 번째 값 -> user_nickname
    community_title: row[2], // 세 번째 값 -> community_title
    community_content: row[3], // 네 번째 값 -> community_content
    community_img: row[4], // 다섯 번째 값 -> community_img
    community_date: row[5], // 여섯 번째 값 -> community_date
    community_readcnt: row[6], // 일곱 번째 값 -> community_readcnt
  }));
};

//   const result = await executeQuery(query);
//   return result;

// const regPost = async ({
//   community_title,
//   community_content,
//   community_img,
// }) => {
//   const query = `INSERT INTO COMMUNITY (TITLE, CONTENT, IMG)
//   VALUES (?, ?, ?)`;
//   const values = [community_title, community_content, community_img];
//   await db.execute(query, values);
// };

const regPost = async ({
  community_title,
  community_content,
  community_img,
}) => {
  const query = `
  INSERT INTO ${community_info.tableName}(
  ${community_info.columns.community_title},
  ${community_info.columns.community_content},
  ${community_info.columns.community_img},
  ${community_info.columns.community_date},
  ${community_info.columns.community_readcnt},
  ) VALUES (
   :community_title,
   :community_content,
   :community_img,
   SYSDATE,
   0)
  `;

  const values = {
    community_title,
    community_content,
    community_img,
  };

  await executeQuery(query, values);
};

module.exports = { getPosts, regPost };
