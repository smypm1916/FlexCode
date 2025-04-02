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
import { Email_Box } from "../../style/SignUp_Style";

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
      alert("Please Enter Your Name");
      return;
    }
    if (!email_id) {
      alert("Please Enter Your Email");
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
        setErrorMessage("Can Not Find User, Please Check Your Name and Email");
      }
    } catch (error) {
      console.error("Faild Search User Account : ", error);
      setErrorMessage("Server Error");
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
      alert("Please Enter Password");
      return;
    }
    if (!userPasswordCheck) {
      alert("Please Enter Password");
    }
    if (!passwordValid) {
      alert(
        "Password must be 8 characters or more, including letters, numbers, and special characters."
      );
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
        alert("Your password has been successfully reset.");
        onBack();
      } else {
        alert("Failed to reset the password. Please try again.");
        return;
      }
    } catch (error) {
      console.error("Failed Reset Password : ", error);
      alert("Failed to reset the password. Please try again.");
    }
  };
  return (
    <Container_Modal>
      {findPwView === "check" && (
        <Modal_Wrapper>
          <div className="findPw-title">
            <Title>Reset Password</Title>
          </div>
          <Input_Wrapper>
            <div className="findPw-name-label">
              <label>Name</label>
            </div>
            <Input_Box>
              <Input_Style
                type="text"
                placeholder="Please Enter Your Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Input_Box>
          </Input_Wrapper>
          <Input_Wrapper>
            <label>EMAIL</label>
            <Email_Box>
              <Input_Box>
                <Input_Style
                  type="text"
                  name="email_id"
                  placeholder="Please Enter Your Email"
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
            </Email_Box>
          </Input_Wrapper>
          {errorMessage && <p>{errorMessage}</p>}
          <Button_Wrapper_100 className="grid2">
            {/* <button
              onClick={() => {
                setFinePwView("reset");
              }}
            >
              비밀번호 찾기
            </button> */}
            <Button
              className={"findPw"}
              btnTxt={"Reset Password"}
              onClick={handleFindUser}
            />
            <Button className={"calcel"} btnTxt={"Cancel"} onClick={onBack} />
          </Button_Wrapper_100>
        </Modal_Wrapper>
      )}
      {findPwView === "reset" && (
        <Modal_Wrapper>
          <div className="findPw-title">
            <Title>Reset Password</Title>
          </div>
          <Input_Wrapper>
            <div className="findPw-password-label">
              <label>New Password</label>
            </div>
            <Input_Box>
              <Input_Style
                type="password"
                name="userPassword"
                placeholder="Please Enter New Password"
                value={userPassword}
                onChange={handlePwChange}
              />
            </Input_Box>
          </Input_Wrapper>
          <p style={{ color: "gray", fontSize: "10px" }}>
            Password must be 8 characters or more, including letters, numbers,
            and special characters.
          </p>
          <Input_Wrapper>
            <div className="findPw-password-check_label">
              <label>Check Password</label>
            </div>
            <Input_Box>
              <Input_Style
                type="password"
                name="userPasswordCheck"
                placeholder="Please Enter Password"
                value={userPasswordCheck}
                onChange={handlePwChange}
              />
            </Input_Box>
          </Input_Wrapper>
          {passwordMatch === false && (
            <p style={{ color: "red", fontSize: "10px" }}>
              Passwords do not match.
            </p>
          )}
          <Button_Wrapper_100>
            <Button
              className={"resetPw"}
              btnTxt={"Set Password"}
              onClick={handleUpdatePw}
            />
            <Button className={"cancel"} btnTxt={"Cancel"} onClick={onBack} />
          </Button_Wrapper_100>
        </Modal_Wrapper>
      )}
    </Container_Modal>
  );
};

export default FindPw;
