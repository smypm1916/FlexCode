const { executeQuery } = require("../config/oracledb");
const community_info = require("../models/community_info");

const getPosts = async () => {
  const query = `
  SELECT 
    community_no,
   c.user_nickname,
    community_title,
    community_content,
    community_img,
     u.user_profile,
    TO_CHAR(${community_info.columns.community_date}, 'YYYY/MM/DD') AS community_date,
    community_readcnt
  FROM 
    ${community_info.tableName} c, user_account u where c.user_nickname = u.user_nickname
  ORDER BY 
    ${community_info.columns.community_no}
`;
  return await executeQuery(query);
};

const regPost = async ({
  user_nickname,
  community_title,
  community_content,
  community_img,
}) => {
  const query = `
  INSERT INTO ${community_info.tableName}(
  ${community_info.columns.community_no},
  ${community_info.columns.user_nickname},
  ${community_info.columns.community_title},
  ${community_info.columns.community_content},
  ${community_info.columns.community_img},
  ${community_info.columns.community_date},
  ${community_info.columns.community_readcnt}
  ) VALUES (
   community_no_seq.nextval,
   :user_nickname,
   :community_title,
   :community_content,
   :community_img,
   CURRENT_TIMESTAMP,
   0)
  `;
  console.log(query);
  const values = {
    user_nickname,
    community_title,
    community_content,
    community_img,
  };

  await executeQuery(query, values);
};

const detailPost = async (id) => {
  const query = `SELECT 
    community_no,
    c. user_nickname,
    community_title,
    community_content,
    community_img,
    TO_CHAR(${community_info.columns.community_date}, 'YYYY/MM/DD') AS community_date,
    community_readcnt,
    u.user_profile
  FROM 
    ${community_info.tableName} c, user_account u WHERE c.user_nickname=u.user_nickname and ${community_info.columns.community_no} =:id`;
  return await executeQuery(query, [id]);
};

const increaseViewCount = async (id) => {
  const query = `UPDATE ${community_info.tableName} SET ${community_info.columns.community_readcnt} = ${community_info.columns.community_readcnt} +1 WHERE ${community_info.columns.community_no} = :id`;
  console.log("조회수 증가 쿼리 실행:", query, id);
  await executeQuery(query, [id]);
};

const deletePost = async (id) => {
  const query = `delete ${community_info.tableName} where ${community_info.columns.community_no} =:id`;
  return await executeQuery(query, [id]);
};

const updatePost = async ({
  community_no,
  community_title,
  community_content,
  community_img,
}) => {
  const query = `update ${community_info.tableName} set ${community_info.columns.community_title} = :community_title, ${community_info.columns.community_content} = :community_content, ${community_info.columns.community_img} = :community_img, ${community_info.columns.community_date} = CURRENT_TIMESTAMP where ${community_info.columns.community_no} =:community_no`;
  const values = {
    community_no,
    community_title,
    community_content,
    community_img,
  };
  return await executeQuery(query, values);
};
module.exports = {
  getPosts,
  regPost,
  detailPost,
  increaseViewCount,
  deletePost,
  updatePost,
};
