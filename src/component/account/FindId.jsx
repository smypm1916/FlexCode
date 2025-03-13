import { useState } from "react";

import Button from "../common/Button";
import TextInput from "../common/TextInput";
import Select from "../common/Select";
import axios from "axios";

const FindId = ({ onBack }) => {
  const style = {
    display: "flex",
  };

  const [findEmail, setFindEmail] = useState(null);

  const [userName, setUserName] = useState("");
  console.log(userName);

  const [userTel, setUserTel] = useState({
    first_tel: "010",
    mid_tel: "",
    last_tel: "",
  });

  const { first_tel, mid_tel, last_tel } = userTel;

  const handleSelectTelChange = (e) => {
    setUserTel((prev) => ({
      ...prev,
      first_tel: e.target.value,
    }));
  };

  const handleInputTelChange = (e) => {
    const { name, value } = e.target;
    setUserTel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const full_tel = `${first_tel}-${mid_tel}-${last_tel}`;
  console.log(full_tel);

  const handleFindId = async (e) => {
    e.preventDefault();
    // 필수 입력값 확인
    if (!userName) {
      alert("이름을 입력해주세요.");
      return;
    }
    if (!mid_tel) {
      alert("전화번호를 입력해주세요.");
      return;
    }
    if (!last_tel) {
      alert("전화번호를 입력해주세요");
      return;
    }
    try {
      //findIdData 생성
      const findIdData = {
        name: userName,
        tel: full_tel,
      };
      console.log("보낼 데이터 : ", findIdData);

      // API요청
      const response = await axios.post(
        "http://localhost:8080/api/users/findId",
        findIdData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("이메일 찾기 성공:", response.data);

      // API 응답 데이터 상태 저장
      if (response.data.success) {
        setFindEmail(response.data.user_email[0].USER_EMAIL);
      } else {
        setFindEmail("이메일을 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("이메일 찾기 실패:", error);
    }
  };

  return (
    <div className="findIdPage">
      <div className="findId-title">
        <h2>이메일 찾기</h2>
      </div>
      <div className="findId-name" style={style}>
        <div className="findId-name-label">
          <label>이름</label>
        </div>
        <div className="findId-name-input">
          <TextInput
            type={"text"}
            name={"input_name"}
            placeholder={"이름을 입력하세요"}
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="findId-tel" style={style}>
        <div className="findId-tel-label">
          <label>TEL</label>
        </div>
        <div className="findId-tel-select">
          <Select
            className={"selectTel"}
            options={[
              { value: "010", label: "010" },
              { value: "011", label: "011" },
              { value: "02", label: "02" },
              { value: "031", label: "031" },
            ]}
            defaultValue={"010"}
            onChange={handleSelectTelChange}
          />
        </div>
        <div>
          <label>-</label>
        </div>
        <div className="findId-tel-middle">
          <TextInput
            type={"text"}
            name={"mid_tel"}
            placeholder={"1234"}
            value={mid_tel}
            onChange={handleInputTelChange}
          />
        </div>
        <div>
          <label>-</label>
        </div>
        <div className="findId-tel-last">
          <TextInput
            type={"text"}
            name={"last_tel"}
            placeholder={"5678"}
            value={last_tel}
            onChange={handleInputTelChange}
          />
        </div>
      </div>
      <div className="findId-result">
        {findEmail && (
          <div className="email-result">
            <h3>{findEmail}</h3>
          </div>
        )}
      </div>
      <div className="findId-btns" style={style}>
        <Button
          className={"findId"}
          btnTxt={"이메일찾기"}
          onClick={handleFindId}
        />
        <Button className={"cancel"} btnTxt={"취소"} onClick={onBack} />
      </div>
    </div>
  );
};

export default FindId;
