const oracledb = require("../config/oracledb");

/**
 * community_info 테이블
 * community_no(pk)
 * user_nickname(fk)
 * community_title
 * community_content
 * community_img
 * community_date
 * community_readcnt
 */

const community_info = {
  tableName: "COMMUNITY_INFO",
  columns: {
    community_no: "COMMUNITY_NO",
    user_nickname: "USER_NICKNAME",
    community_title: "COMMUNITY_TITLE",
    community_content: "COMMUNITY_CONTENT",
    community_img: "COMMUNITY_IMG",
    community_date: "COMMUNITY_DATE",
    community_readcnt: "COMMUNITY_READCNT",
  },
};

module.exports = community_info;
