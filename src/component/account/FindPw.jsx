import { useState } from "react";
import Button from "../common/Button";
import {
  Button_Wrapper_100,
  Container_Modal,
  Input_Box,
  Input_Style,
  Input_Wrapper,
  Modal_Wrapper,
  Select_Style,
} from "../../style/Common_Style";
import { Title } from "../../style/Modal_Style";
import axios from "axios";

const FindPw = ({ onBack }) => {
  // 비밀번호 찾기/재설정 화면을 각각 나누어서 관리하는 상태관리 변수
  const [findPwView, setFindPwView] = useState("check");

  const [userName, setUserName] = useState("");
  console.log(userName);

  const [userEmail, setUserEmail] = useState({
    email_id: "",
    email_address: "naver.com",
  });

  const { email_id, email_address } = userEmail;

  const handleSelectEmailChange = (e) => {
    setUserEmail((prev) => ({
      ...prev,
      email_address: e.target.value,
    }));
  };

  const handleInputEmailChange = (e) => {
    const { name, value } = e.target;
    setUserEmail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const full_email = `${email_id}@${email_address}`;
  console.log(full_email);

  const [errorMessage, setErrorMessage] = useState("");

  const handleFindUser = async () => {
    if (!userName) {
      alert("이름을 입력해주세요.");
      return;
    }
    if (!email_id) {
      alert("이메일을 입력해주세요");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/findPw",
        {
          name: userName,
          email: full_email,
        }
      );
      if (response.data.exists) {
        setFindPwView("reset"); // 등록된 유저일 경우 비밀번호 재설정 화면으로 전환
        setErrorMessage(""); // 에러 메시지 초기화
      } else {
        setErrorMessage(
          "등록된 사용자가 없습니다. 이름과 이메일을 다시 확인해주세요."
        );
      }
    } catch (error) {
      console.error("비밀번호 찾기 요청 실패:", error);
      setErrorMessage("서버 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const [password, setPassword] = useState({
    userPassword: "",
    userPasswordCheck: "",
  });

  const { userPassword, userPasswordCheck } = password;

  const validatePassword = (userPassword) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(userPassword);
  };

  // 비밀번호 유효성 체크 결과
  const [passwordValid, setPasswordValid] = useState(null);

  // 비밀번호 일치 여부 체크 결과
  const [passwordMatch, setPasswordMatch] = useState(null);

  const handlePwChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    console.log(name, value);
    // 비밀번호 유효성 검사
    if (name == "userPassword") {
      setPasswordValid(validatePassword(value)); // 유효하면 true, 아님 false
      setPasswordMatch(password.userPasswordCheck === value);
    }
    // 비밀번호 일치 여부 검사
    if (name == "userPasswordCheck") {
      setPasswordMatch(value === password.userPassword); // 비밀번호 입력 데이터랑 비교
    }
    setPassword({
      ...password,
      [name]: value,
    });
  };

  const handleUpdatePw = async () => {
    if (!userPassword) {
      alert("비밀번호를 입력해주세요");
      return;
    }
    if (!userPasswordCheck) {
      alert("비밀번호를 입력해주세요");
    }
    if (!passwordValid) {
      alert("비밀번호는 영어+숫자+특수문자 조합으로 8자 이상이어야 합니다.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/modifyPw",
        {
          password: userPasswordCheck,
          email: full_email,
        }
      );
      if (response.data.success) {
        alert("비밀번호가 재설정되었습니다.");
        onBack();
      } else {
        alert("비밀번호 재설정에 실패하였습니다. 다시 시도해주세요.");
        return;
      }
    } catch (error) {
      console.error("비밀번호 재설정 요청 실패:", error);
      alert("비밀번호 재설정에 실패하였습니다. 다시 시도해주세요.");
    }
  };
  return (
    <Container_Modal>
      {findPwView === "check" && (
        <Modal_Wrapper>
          <div className="findPw-title">
            <Title>비밀번호 찾기</Title>
          </div>
          <Input_Wrapper>
            <div className="findPw-name-label">
              <label>이름</label>
            </div>
            <Input_Box>
              <Input_Style
                type="text"
                placeholder="이름을 입력하세요"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Input_Box>
          </Input_Wrapper>
          <Input_Wrapper>
            <div className="findPw-email-label">
              <label>EMAIL</label>
            </div>
            <Input_Box>
              <Input_Style
                type="text"
                name="email_id"
                placeholder="EMAIL을 입력하세요"
                value={email_id}
                onChange={handleInputEmailChange}
              />
            </Input_Box>
            <label>@</label>
            <Select_Style
              value={email_address}
              onChange={handleSelectEmailChange}
            >
              <option value="naver.com">naver.com</option>
              <option value="hanmail.net">hanmail.net</option>
              <option value="daum.net">daum.net</option>
              <option value="gmail.com">gmail.com</option>
              <option value="nate.com">nate.com</option>
              <option value="hotmail.com">hotmail.com</option>
              <option value="outlook.com">outlook.com</option>
              <option value="icloud.com">icloud.com</option>
            </Select_Style>
          </Input_Wrapper>
          {errorMessage && <p>{errorMessage}</p>}
          <Button_Wrapper_100>
            {/* <button
              onClick={() => {
                setFinePwView("reset");
              }}
            >
              비밀번호 찾기
            </button> */}
            <Button
              className={"findPw"}
              btnTxt={"비밀번호 재설정"}
              onClick={handleFindUser}
            />
            <Button className={"calcel"} btnTxt={"취소"} onClick={onBack} />
          </Button_Wrapper_100>
        </Modal_Wrapper>
      )}
      {findPwView === "reset" && (
        <Modal_Wrapper>
          <div className="findPw-title">
            <Title>비밀번호 재설정</Title>
          </div>
          <Input_Wrapper>
            <div className="findPw-password-label">
              <label>새 비밀번호</label>
            </div>
            <Input_Box>
              <Input_Style
                type="password"
                name="userPassword"
                placeholder="비밀번호를 입력하세요"
                value={userPassword}
                onChange={handlePwChange}
              />
            </Input_Box>
          </Input_Wrapper>
          <p style={{ color: "gray", fontSize: "10px" }}>
            비밀번호는 영어+숫자+특수문자 조합으로 8자 이상이어야 합니다.
          </p>
          <Input_Wrapper>
            <div className="findPw-password-check_label">
              <label>비밀번호 확인</label>
            </div>
            <Input_Box>
              <Input_Style
                type="password"
                name="userPasswordCheck"
                placeholder="비밀번호를 입력하세요"
                value={userPasswordCheck}
                onChange={handlePwChange}
              />
            </Input_Box>
          </Input_Wrapper>
          {passwordMatch === false && (
            <p style={{ color: "red", fontSize: "10px" }}>
              비밀번호가 일치하지 않습니다.
            </p>
          )}
          <Button_Wrapper_100>
            <Button
              className={"resetPw"}
              btnTxt={"설정하기"}
              onClick={handleUpdatePw}
            />
            <Button className={"cancel"} btnTxt={"취소"} onClick={onBack} />
          </Button_Wrapper_100>
        </Modal_Wrapper>
      )}
    </Container_Modal>
  );
};

export default FindPw;
