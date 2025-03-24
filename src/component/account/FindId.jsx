import { useState } from "react";
import Button from "../common/Button";
import TextInput from "../common/TextInput";
import Select from "../common/Select";
import axios from "axios";

// 스타일 임포트
import {
  Container_Modal,
  Input_Box,
  Input_Style,
  Modal_Wrapper,
  Select_Style,
  Input_Wrapper,
} from "../../style/Common_Style";
import { Button_Wrapper } from "../../style/Product_detail_style";
import { Phone_Box, Title } from "../../style/Modal_Style";

const FindId = ({ onBack, onClose }) => {
  // 상태 관리
  const [findEmail, setFindEmail] = useState(null);
  const [userName, setUserName] = useState("");

  const [userTel, setUserTel] = useState({
    first_tel: "010",
    mid_tel: "",
    last_tel: "",
  });

  const { first_tel, mid_tel, last_tel } = userTel;
  const full_tel = `${first_tel}-${mid_tel}-${last_tel}`;

  // 전화번호 변경 핸들러
  const handleSelectTelChange = (e) => {
    setUserTel((prev) => ({ ...prev, first_tel: e.target.value }));
  };

  const handleInputTelChange = (e) => {
    const { name, value } = e.target;
    setUserTel((prev) => ({ ...prev, [name]: value }));
  };

  // 이메일 찾기 API 요청
  const handleFindId = async (e) => {
    e.preventDefault();

    if (!userName) {
      alert("이름을 입력해주세요.");
      return;
    }
    if (!mid_tel || !last_tel) {
      alert("전화번호를 입력해주세요.");
      return;
    }

    try {
      const findIdData = { name: userName, tel: full_tel };
      console.log("보낼 데이터:", findIdData);

      const response = await axios.post(
        "http://localhost:8080/api/users/findId",
        findIdData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("이메일 찾기 응답:", response.data);
      setFindEmail(
        response.data.success
          ? response.data.user_email
          : "이메일을 찾을 수 없습니다."
      );
    } catch (error) {
      console.error("이메일 찾기 실패:", error);
      setFindEmail("서버 오류 발생");
    }
  };

  return (
    <Container_Modal>
      <Modal_Wrapper>
        <Title>이메일 찾기</Title>

        {/* 이름 입력 */}
        <Input_Wrapper>
          <label>이름</label>
          <Input_Box>
            <Input_Style
              type="text"
              placeholder="이름을 입력하세요"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Input_Box>
        </Input_Wrapper>

        {/* 전화번호 입력 */}
        <Input_Wrapper>
          <label>TEL</label>
          <Phone_Box>
            <Select_Style value={first_tel} onChange={handleSelectTelChange}>
              <option value="010">010</option>
              <option value="011">011</option>
              <option value="02">02</option>
              <option value="031">031</option>
            </Select_Style>
            <label>-</label>
            <Input_Box>
              <Input_Style
                type="text"
                name="mid_tel"
                placeholder="1234"
                value={mid_tel}
                onChange={handleInputTelChange}
              />
            </Input_Box>
            <label>-</label>
            <Input_Box>
              <Input_Style
                type="text"
                name="last_tel"
                placeholder="5678"
                value={last_tel}
                onChange={handleInputTelChange}
              />
            </Input_Box>
          </Phone_Box>
        </Input_Wrapper>

        {/* 이메일 결과 출력 */}
        {findEmail && (
          <div className="findId-result">
            <h3>{findEmail}</h3>
          </div>
        )}

        {/* 버튼 */}
        <Button_Wrapper>
          <Button
            className="findId"
            btnTxt="이메일 찾기"
            onClick={handleFindId}
          />
          <Button className="cancel" btnTxt="취소" onClick={onBack} />
        </Button_Wrapper>
      </Modal_Wrapper>
    </Container_Modal>
  );
};

export default FindId;
