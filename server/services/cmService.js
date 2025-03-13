const { executeQuery } = require("../config/oracledb");
const community_info = require("../models/community_info");

const getPosts = async () => {
  const query = `
  SELECT 
    community_no,
    user_nickname,
    community_title,
    community_content,
    community_img,
    TO_CHAR(${community_info.columns.community_date}, 'YYYY/MM/DD') AS community_date,
    community_readcnt
  FROM 
    ${community_info.tableName}
  ORDER BY 
    ${community_info.columns.community_date}
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

module.exports = { getPosts, regPost };
