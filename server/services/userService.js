const { userExecuteQuery } = require("../config/oracledb");
const user_account = require("../models/user_account");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 이메일 중복 체크 서비스
const checkEmail = async (email) => {
  try {
    const query = `select ${user_account.columns.user_email} from ${user_account.tableName} where ${user_account.columns.user_email} =:email`;
    const result = await userExecuteQuery(query, { email });

    const rows = result.rows;
    console.log("이메일 중복체크 rows:", rows);
    if (!Array.isArray(rows) || rows.length === 0) {
      // result의 반환값이 배열이 아니거나 길이가 0일경우 (조회된 데이터 없음)
      console.log("중복되는 이메일 없음");
      return false;
    }
    return true; // true: 중복되는 이메일 있음
  } catch (error) {
    console.error("이메일 중복체크 서비스 오류:", error);
    throw new Error("이메일 중복체크 처리 중 오류가 발생했습니다.");
  }
};

// 닉네임 중복 체크 서비스
const checkNickname = async (nickname) => {
  try {
    const query = `select ${user_account.columns.user_nickname} from ${user_account.tableName} where ${user_account.columns.user_nickname} =:nickname`;
    const result = await userExecuteQuery(query, { nickname });

    const rows = result.rows;
    console.log("닉네임 중복체크 rows:", rows);

    if (!Array.isArray(rows) || rows.length === 0) {
      // result의 반환값이 배열이 아니거나 길이가 0일경우 (조회된 데이터 없음)
      console.log("중복되는 닉네임 없음");
      return false;
    }
    return true; // true: 중복되는 닉네임 있음
  } catch (error) {
    console.error("닉네임 중복체크 서비스 오류:", error);
    throw new Error("닉네임 중복체크 처리 중 오류가 발생했습니다.");
  }
};

// 회원가입
const registerUser = async (userData) => {
  try {
    const {
      user_email,
      user_nickname,
      user_password,
      user_name,
      user_addr,
      user_tel,
      user_profile,
    } = userData;

    // 비밀번호를 해싱(bcrypt 사용)
    const saltRounds = 10; // 솔트 값(보안 강화)
    const hashedPassword = await bcrypt.hash(user_password, saltRounds);

    console.log("해싱된 비밀번호:", hashedPassword);

    const query = `insert into ${user_account.tableName} (${Object.values(
      user_account.columns
    ).join(
      ","
    )}) values (:user_email, :user_nickname, :user_password, :user_name, :user_addr, :user_tel, :user_profile)`;

    const result = await userExecuteQuery(query, {
      user_email,
      user_nickname,
      user_password: hashedPassword,
      user_name,
      user_addr,
      user_tel,
      user_profile,
    });

    const rowsAffected = result.rowsAffected;
    if (rowsAffected && rowsAffected > 0) {
      return { success: true, message: "회원가입 성공" };
    }
    return { success: false, message: "회원가입 실패" };
  } catch (error) {
    console.error("회원가입 서비스 오류:", error);
    throw new Error("회원가입 처리 중 오류가 발생했습니다.");
  }
};

// 로그인
const loginUser = async (email, password) => {
  try {
    console.log("로그인 시도-이메일:", email);
    // 유저 이메일로 DB 조회
    const query = `select ${user_account.columns.user_email}, ${user_account.columns.user_password}, ${user_account.columns.user_profile}, ${user_account.columns.user_nickname} from ${user_account.tableName} where ${user_account.columns.user_email} = :email`;
    const result = await userExecuteQuery(query, { email });

    const rows = result.rows;

    console.log("로그인체크 rows:", rows);

    // 이메일 존재 여부 확인
    if (!Array.isArray(rows) || rows.length === 0) {
      console.log("로그인 실패: 등록되지 않은 이메일");
      return { success: false, message: "등록되지 않은 이메일입니다." };
    }

    const user = rows[0];
    const getPassword = user.USER_PASSWORD;

    // 비밀번호 비교
    const pwMatch = await bcrypt.compare(password, getPassword);
    console.log("비밀번호 비교 결과:", pwMatch);
    if (!pwMatch) {
      console.log("로그인 실패: 비밀번호 불일치");
      return { success: false, message: "비밀번호가 일치하지 않습니다." };
    }

    // JWT 토큰 발급(이메일 조회 성공 & 비밀번호 일치여부 확인)
    const token = jwt.sign(
      {
        email: user.USER_EMAIL,
        profile: user.USER_PROFILE,
        nickname: user.USER_NICKNAME,
      },
      process.env.JWT_SECRET || "your_secret_key", // 환경변수(env)에서 JWT_SECRET 가져옴
      { expiresIn: "1h" } // 토큰 유효시간 => 1시간
    );

    console.log("JWT 토큰 발급 성공:", token);

    return { success: true, token };
  } catch (error) {
    console.error("로그인 서비스 오류:", error);
    throw new Error("로그인 처리 중 오류가 발생했습니다.");
  }
};

// 회원 이메일 조회
const findId = async (name, tel) => {
  try {
    console.log("이메일 찾기 조건 이름, 전화번호:", name, tel);
    const query = `select user_email from user_account where user_name = :name and user_tel = :tel`;
    const result = await userExecuteQuery(query, { name, tel });

    const rows = result.rows;
    console.log("회원 이메일 조회 rows : ", rows);

    // 이메일 존재 여부 확인
    if (!Array.isArray(rows) || rows.length === 0) {
      console.log("조회 실패: 등록되지 않은 이메일");
      return { success: false, message: "등록되지 않은 이메일입니다." };
    }

    // 조회 성공 시 유저에게 보여줄 이메일 변수에 저장
    const user_email = rows[0].USER_EMAIL;
    return { success: true, user_email };
  } catch (error) {
    console.error("이메일 찾기 서비스 오류:", error);
    throw new Error("이메일 찾기 처리 중 오류가 발생했습니다.");
  }
};

// 회원정보 조회(비밀번호 재설정용)
const findPw = async (name, email) => {
  try {
    console.log("비밀번호(유저) 찾기 조건 이름, 이메일:", name, email);
    const query = `select * from user_account where user_name = :name and user_email = :email`;
    const result = await userExecuteQuery(query, { name, email });

    const rows = result.rows;
    console.log("회원정보 조회 rows :", rows);

    // 유저 존재 여부 확인
    if (!Array.isArray(rows) || rows.length === 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("비밀번호 찾기 서비스 오류:", error);
    throw new Error("비밀번호(유저) 찾기 처리 중 오류가 발생했습니다.");
  }
};

// 회원 비밀번호 수정
const modifyPw = async (password, email) => {
  try {
    console.log("재설정 비밀번호:", password);
    console.log("재설정 대상 이메일:", email);

    // 비밀번호를 해싱(bcrypt 사용)
    const saltRounds = 10; // 솔트 값(보안 강화)
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const query = `update user_account set user_password = :password where user_email = :email`;
    const result = await userExecuteQuery(query, {
      password: hashedPassword,
      email,
    });

    const rowsAffected = result.rowsAffected;

    if (rowsAffected && rowsAffected > 0) {
      return { success: true, message: "비밀번호 재설정 성공" };
    }
    return { success: false, message: "비밀번호 재설정 실패" };
  } catch (error) {
    console.error("비밀번호 재설정 서비스 오류:", error);
    throw new Error("비밀번호 재설정 처리 중 오류가 발생했습니다.");
  }
};

// 회원정보 조회 (마이페이지->회원정보 수정용)
const getUser = async (email) => {
  try {
    console.log("조회대상 이메일:", email);

    const query = `select * from user_account where user_email = :email`;
    const result = await userExecuteQuery(query, { email });

    const rows = result.rows;
    console.log("회원정보 조회 rows:", rows);

    if (!Array.isArray(rows) || rows.length === 0) {
      console.log("조회 실패");
      return { success: false, message: "회원정보 조회에 실패했습니다." };
    }

    return { success: true, result };
  } catch (error) {
    console.error("회원정보 조회 서비스 오류:", error);
    throw new Error("회원정보 조회 처리 중 오류가 발생했습니다.");
  }
};

// 회원정보 수정(이미지o)
const updateProfileWithImage = async (userData) => {
  const {
    user_email,
    user_name,
    user_nickname,
    user_tel,
    user_addr,
    user_profile,
    oldNickname, // 이전 닉네임 (커뮤니티 테이블 업데이트용)
  } = userData;

  // 업로드된 프로필 이미지 파일 이름만 추출
  const profileImg = user_profile.filename;

  // 커뮤니티 테이블 닉네임 수정 쿼리
  const communityTBQuery = `update community_info set user_nickname = :user_nickname where user_nickname = :oldNickname`;
  // 사용자 계정 테이블 수정 쿼리
  const userTBQuery = `update user_account set user_name = :user_name, user_nickname = :user_nickname, user_tel = :user_tel, user_addr = :user_addr, user_profile = :user_profile where user_email = :user_email`;

  const updateUserResult = await userExecuteQuery(userTBQuery, {
    user_email,
    user_name,
    user_nickname,
    user_tel,
    user_addr,
    user_profile: profileImg,
  });

  const updateCommunityResult = await userExecuteQuery(communityTBQuery, {
    user_nickname,
    oldNickname,
  });

  const userRowsAffected = updateUserResult.rowsAffected;
  const communityRowsAffected = updateCommunityResult.rowsAffected;

  if (!userRowsAffected && userRowsAffected === 0) {
    console.log("회원정보 수정 실패 - 회원 테이블");
    return { success: false, message: "회원정보 수정 실패 - 회원 테이블" };
  }

  if (!communityRowsAffected && communityRowsAffected === 0) {
    console.log("회원정보 수정 실패 - 커뮤니티 테이블");
    return { success: false, message: "회원정보 수정 실패 - 커뮤니티 테이블" };
  }

  // 회원정보 재조회 (최신 정보 가져오기)
  const selectdUserQuery = `select * from user_account where user_email = :email`;
  const selectUserResult = await userExecuteQuery(selectdUserQuery, {
    email: userData.user_email,
  });

  const rows = selectUserResult.rows;

  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error("회원정보 조회 실패");
  }

  const user = rows[0]; // 최신 회원정보

  // JWT 토큰 발급 (수정된 정보 반영)
  const newToken = jwt.sign(
    {
      email: user.USER_EMAIL,
      profile: user.USER_PROFILE,
      nickname: user.USER_NICKNAME,
    },
    process.env.JWT_SECRET || "your_secret_key", // 환경변수(env)에서 JWT_SECRET 가져옴
    { expiresIn: "1h" } // 토큰 유효시간 => 1시간
  );

  return {
    success: true,
    message: "회원정보 수정 성공",
    token: newToken,
  };
};

// 회원정보 수정(이미지x)
const updateProfile = async (userData) => {
  const {
    user_email,
    user_name,
    user_nickname,
    user_tel,
    user_addr,
    oldNickname,
  } = userData;

  const communityTBQuery = `update community_info set user_nickname = :user_nickname where user_nickname = :oldNickname`;
  const userTBQuery = `update user_account set user_name = :user_name, user_nickname = :user_nickname, user_tel = :user_tel, user_addr = :user_addr where user_email = :user_email`;

  const updateUserResult = await userExecuteQuery(userTBQuery, {
    user_email,
    user_name,
    user_nickname,
    user_tel,
    user_addr,
  });

  const updateCommunityResult = await userExecuteQuery(communityTBQuery, {
    user_nickname,
    oldNickname,
  });

  const userRowsAffected = updateUserResult.rowsAffected;
  const communityRowsAffected = updateCommunityResult.rowsAffected;

  if (!userRowsAffected && userRowsAffected === 0) {
    console.log("회원정보 수정 실패 - 회원 테이블");
    return { success: false, message: "회원정보 수정 실패 - 회원 테이블" };
  }

  if (!communityRowsAffected && communityRowsAffected === 0) {
    console.log("회원정보 수정 실패 - 커뮤니티 테이블");
    return { success: false, message: "회원정보 수정 실패 - 커뮤니티 테이블" };
  }

  const selectUserQuery = `select * from user_account where user_email = :email`;
  const selectUserResult = await userExecuteQuery(selectUserQuery, {
    email: userData.user_email,
  });

  const rows = selectUserResult.rows;

  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error("회원정보 조회 실패");
  }

  const user = rows[0]; // 최신 회원정보

  // JWT 토큰 발급
  const newToken = jwt.sign(
    {
      email: user.USER_EMAIL,
      profile: user.USER_PROFILE,
      nickname: user.USER_NICKNAME,
    },
    process.env.JWT_SECRET || "your_secret_key", // 환경변수(env)에서 JWT_SECRET 가져옴
    { expiresIn: "1h" } // 토큰 유효시간 => 1시간
  );

  return {
    success: true,
    message: "회원정보 수정 성공",
    token: newToken,
  };
};

const deleteUserAccount = async (email) => {
  try {
    console.log("삭제대상 이메일:", email);

    const query = `delete user_account where user_email = :email`;

    const result = await userExecuteQuery(query, email);

    const rowsAffected = result.rowsAffected;

    if (!rowsAffected || rowsAffected === 0) {
      console.log("삭제 실패");
      return { success: false, message: "회원정보 삭제 실패" };
    }
    return { success: true, message: "회원정보 삭제 성공" };
  } catch (error) {
    console.error("회원정보 삭제 서비스 오류:", error);
    throw new Error("회원정보 삭제 처리 중 오류가 발생했습니다.");
  }
};

// 회원 커뮤니티글 조회
const getUserCommunitys = async (nickname) => {
  try {
    console.log("조회대상 닉네임:", nickname);

    const query = `select * from community_info where user_nickname = :nickname order by community_date desc`;
    const result = await userExecuteQuery(query, { nickname });

    const rows = result.rows;

    if (!Array.isArray(rows) || rows.length === 0) {
      console.log("조회 실패");
      return { success: false, message: "커뮤니티글 조회 실패" };
    }
    return { success: true, result };
  } catch (error) {
    console.error("커뮤니티글 조회 서비스 오류:", error);
    throw new Error("커뮤니티글 조회 처리 중 오류가 발생했습니다.");
  }
};

// 회원 구매내역 조회
const getUserOrders = async (email) => {
  try {
    console.log("조회대상 이메일:", email);

    const query = `SELECT 
                          oi.order_no,
                          oi.total_price,
                          oi.order_date,
                          oi.order_state,
                  JSON_ARRAYAGG(
                      JSON_OBJECT(
                                  'product_no' VALUE oi2.product_no,
                                  'product_quantity' VALUE oi2.product_quantity,
                                  'product_name' VALUE pi.product_name,
                                  'product_img' VALUE pi.product_img
                                  )
                                ) AS items -- 주문 항목들을 하나의 JSON 배열로 묶어 'items'라는 별칭 부여
                  FROM order_info oi
                  JOIN order_items oi2 ON oi.order_no = oi2.order_no
                  JOIN product_info pi ON oi2.product_no = pi.product_no
                  WHERE oi.user_email = :email
                  GROUP BY oi.order_no, oi.total_price, oi.order_date, oi.order_state
                  ORDER BY oi.order_date DESC `;
    const result = await userExecuteQuery(query, { email });

    const rows = result.rows;

    if (!Array.isArray(rows) || rows.length === 0) {
      console.log("조회 실패");
      return { success: false, message: "구매내역 조회 실패" };
    }
    return { success: true, result };
  } catch (error) {
    console.error("구매내역 조회 서비스 오류:", error);
    throw new Error("구매내역 조회 처리 중 오류가 발생했습니다.");
  }
};

// 회원 구매내역 상세 조회
const getUserOrderDetail = async (order_no) => {
  try {
    console.log("조회대상 구매내역:", order_no);

    const query = `SELECT 
    oi.order_no,
    oi.total_price,
    oi.order_date,
    oi.order_state,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'product_no' : oi2.product_no,
            'product_quantity' : oi2.product_quantity,
            'product_name' : pi.product_name,
            'product_img' : pi.product_img,
            'product_price' : oi2.product_price,
            'option_price' : oi2.option_price,
            'option_name' : pi2.option_title
        )
    ) AS items
FROM order_info oi
JOIN order_items oi2 ON oi.order_no = oi2.order_no
JOIN product_info pi ON oi2.product_no = pi.product_no
JOIN product_option pi2 ON oi2.option_no = pi2.option_no
WHERE oi.order_no = :order_no
GROUP BY oi.order_no, oi.total_price, oi.order_date, oi.order_state
ORDER BY oi.order_date DESC`;
    const result = await userExecuteQuery(query, { order_no });

    const rows = result.rows;

    if (!Array.isArray(rows) || rows.length === 0) {
      console.log("조회 실패");
      return { success: false, message: "구매내역 상세 조회 실패" };
    }
    return { success: true, result };
  } catch (error) {
    console.error("구매내역 상세 조회 서비스 오류:", error);
    throw new Error("구매내역 상세 조회 처리 중 오류가 발생했습니다.");
  }
};

// 회원 구매내역 상태 변경
const updateOrderState = async (order_no) => {
  try {
    console.log("변경대상 구매번호:", order_no);

    const query = `update order_info set order_state = 1 where order_no =: order_no`;
    const result = await userExecuteQuery(query, { order_no });

    const rowsAffected = result.rowsAffected;

    if (!rowsAffected || rowsAffected === 0) {
      console.log("수정 실패");
      return { success: false, message: "구매내역 상태 수정 실패" };
    }

    return { success: true, message: "구매내역 상태 수정 성공" };
  } catch (error) {
    console.error("구매내역 상태 변경 서비스 오류:", error);
    throw new Error("구매내역 상태 변경 처리 중 오류가 발생했습니다.");
  }
};

module.exports = {
  checkEmail,
  checkNickname,
  registerUser,
  loginUser,
  findId,
  findPw,
  modifyPw,
  getUser,
  updateProfileWithImage,
  updateProfile,
  deleteUserAccount,
  getUserCommunitys,
  getUserOrders,
  getUserOrderDetail,
  updateOrderState,
};
