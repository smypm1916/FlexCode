import axios from "axios";

export const fetchGetCommunity = async (nickname) => {
  console.log("API 닉네임:", nickname);
  try {
    const response = await axios.post(
      "http://localhost:8080/api/users/getUserCommunitys",
      { nickname: nickname },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data.success) {
      console.log("보내준 데이터[커뮤니티]:", response.data.result.rows);
      return response.data.result.rows;
    } else {
      alert("조회된 글 없음.");
      return [];
    }
  } catch (error) {
    console.error("회원 커뮤니티글 조회 실패:", error);
    // alert("회원 커뮤니티 글 조회 중 오류가 발생했습니다.");
    return [];
  }
};

export const fetchGetOrder = async (email) => {
  console.log("API 이메일:", email);
  try {
    const response = await axios.post(
      "http://localhost:8080/api/users/getUserOrders",
      { email: email },
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.data.success) {
      console.log("보내준 데이터[구매내역]:", response.data.result.rows);
      return response.data.result;
    } else {
      alert("조회된 구매내역 없음.");
      return [];
    }
  } catch (error) {
    console.error("회원 구매내역 조회 실패:", error);
    return [];
  }
};

export default { fetchGetCommunity, fetchGetOrder };
