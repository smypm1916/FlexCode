import axios from "axios";
import { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

import {
  BaseAddress,
  Container_Style,
  Input_Box,
  Input_Wrapper,
  Wrapper,
} from "../../style/Common_Style";
import Button from "../common/Button";
import FileUpload from "../common/FileUpload";
import Select from "../common/Select";
import TextInput from "../common/TextInput";
import PostCodeModal from "./PostCodeModal";

import { Navigate } from "react-router-dom";
import { Button_Wrapper } from "../../style/Product_detail_style";
import {
  Email_Box,
  Email_Input,
  Nickname_Box,
  Phone_Box,
  Phone_Input,
  Post_Wrapper,
} from "../../style/SignUp_Style";

const SignUp = () => {
  const navigate = useNavigate();

  const style = {
    display: "flex",
    transition: "all 0.5s",
  };

  const customModalStyle = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
      top: "55%",
      left: "50%",
      transform: "translate(-50%, -50%)", // 정가운데 정렬
      width: "500px",
      height: "450px",
      padding: "0",
      overflow: "hidden",
    },
  };

  const [signUpForm, setSignUpForm] = useState({
    user_name: "",
    user_password: "",
    user_password_check: "",
    user_nickname: "",
    user_profileimg: "",
  });

  const [userTel, setUserTel] = useState({
    first_tel: "010",
    mid_tel: "",
    last_tel: "",
  });

  const [userEmail, setUserEmail] = useState({
    email_id: "",
    email_address: "naver.com",
  });

  // 이메일 중복 확인 결과
  const [emailCheckResult, setEmailCheckResult] = useState(null);

  // 닉네임 중복 확인 결과
  const [nicknameCheckResult, setNicknameCheckResult] = useState(null);

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordRegex.test(password);
  };

  // 비밀번호 유효성 체크 결과
  const [passwordValid, setPasswordValid] = useState(null);

  // 비밀번호 일치 여부 체크 결과
  const [passwordMatch, setPasswordMatch] = useState(null);

  const [userAddress, setUserAddress] = useState({
    base_address: "",
    detail_address: "",
  });

  const [isPostCodeOpen, setIsPostCodeOpen] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // 사용자가 선택한 파일
    setSelectedFile(file);
  };

  const handleOpenPostCode = () => {
    setIsPostCodeOpen(true);
  };

  const handleClosePostCode = () => {
    setIsPostCodeOpen(false);
  };

  const handleSelectAddress = (selectedAddress) => {
    console.log(selectedAddress);
    setUserAddress((prev) => ({
      ...prev,
      base_address: selectedAddress,
    }));
    setIsPostCodeOpen(false);
  };

  const {
    user_name,
    user_password,
    user_password_check,
    user_nickname,
    user_profileimg,
  } = signUpForm;

  const { first_tel, mid_tel, last_tel } = userTel;

  const { email_id, email_address } = userEmail;

  const { base_address, detail_address } = userAddress;

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    // 비밀번호 유효성 검사
    if (name == "user_password") {
      setPasswordValid(validatePassword(value)); // 유효하면 true, 아님 false
      setPasswordMatch(signUpForm.user_password_check === value);
    }
    // 비밀번호 일치 여부 검사
    if (name == "user_password_check") {
      setPasswordMatch(value === signUpForm.user_password); // 비밀번호 입력 데이터랑 비교
    }
    setSignUpForm({
      ...signUpForm,
      [name]: value,
    });
  };

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

  // 이메일 중복 확인 요청(axios 사용)
  const checkEmailDuplicate = async () => {
    if (!userEmail.email_id) {
      alert("이메일을 입력하세요.");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users/check-email`,
        {
          params: { email: full_email },
        }
      );

      console.log("전체 응답:", response.data);
      console.log("exists 타입:", typeof response.data.exists);

      if (response.data.exists) {
        // 받아온 데이터가 true일 경우
        console.log("response 데이터 : " + response.data.exists);
        setEmailCheckResult("이미 사용중인 이메일입니다.");
      } else {
        console.log("response 데이터 : " + response.data.exists);
        setEmailCheckResult("사용 가능한 이메일입니다.");
      }
    } catch (error) {
      console.error("이메일 중복 확인 요청 실패 :", error);
      setEmailCheckResult("오류 발생");
    }
  };

  // 닉네임 중복 확인 요청
  const checkNicknameDuplicate = async () => {
    if (!user_nickname) {
      alert("닉네임을 입력하세요.");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users/check-nickname`,
        {
          params: { nickname: user_nickname },
        }
      );

      console.log("전체 응답:", response.data);
      console.log("exists 타입:", typeof response.data.exists);

      if (response.data.exists) {
        // 받아온 데이터가 true일 경우
        console.log("response 데이터 : " + response.data.exists);
        setNicknameCheckResult("이미 사용중인 닉네임입니다.");
      } else {
        console.log("response 데이터 : " + response.data.exists);
        setNicknameCheckResult("사용 가능한 닉네임입니다.");
      }
    } catch (error) {
      console.error("닉네임 중복 확인 요청 실패 : ", error);
      setNicknameCheckResult("오류발생");
    }
  };

  const handleInputAddressChange = (e) => {
    const { name, value } = e.target;
    setUserAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const full_address = `${base_address},${detail_address}`;
  console.log(full_address);

  const handleRegister = async (e) => {
    e.preventDefault();
    // 필수 입력값 확인
    if (
      !user_name ||
      !mid_tel ||
      !last_tel ||
      !base_address ||
      !detail_address
    ) {
      alert("회원가입시 필요한 필수항목을 입력해주세요.");
      return;
    }
    if (emailCheckResult !== "사용 가능한 이메일입니다.") {
      alert("이메일 중복확인을 해주세요.");
      return;
    }
    if (!passwordValid) {
      alert("비밀번호는 영어+숫자+특수문자 조합으로 8자 이상이어야 합니다.");
      return;
    }
    if (!passwordMatch) {
      alert("비밀번호 일치여부를 확인해주세요.");
      return;
    }
    if (nicknameCheckResult !== "사용 가능한 닉네임입니다.") {
      alert("닉네임 중복확인을 해주세요.");
      return;
    }

    try {
      // FormData 생성
      const userFormData = new FormData();
      userFormData.append("user_email", full_email);
      userFormData.append("user_nickname", user_nickname);
      userFormData.append("user_password", user_password_check);
      userFormData.append("user_name", user_name);
      userFormData.append("user_addr", full_address);
      userFormData.append("user_tel", full_tel);

      if (selectedFile) {
        userFormData.append("user_profile", selectedFile);
      }

      // API 요청 전 데이터 확인
      for (let [key, value] of userFormData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        userFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.success) {
        setSignUpForm({
          user_name: "",
          user_password: "",
          user_password_check: "",
          user_nickname: "",
          user_profileimg: "",
        });
        setUserTel({
          first_tel: "010",
          mid_tel: "",
          last_tel: "",
        });
        setUserEmail({
          email_id: "",
          email_address: "naver.com",
        });
        setUserAddress({
          base_address: "",
          detail_address: "",
        });
        setSelectedFile(null);
        setEmailCheckResult(null);
        setNicknameCheckResult(null);
        setPasswordValid(null);
        setPasswordMatch(null);

        navigate("/signup-success"); // 회원가입 완료 페이지로 이동
      }
    } catch (error) {
      console.error("회원가입 요청 실패:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <Wrapper className="cm" id="register">
      <Container_Style>
        <div className="signUp-title">
          <h2>회원가입</h2>
        </div>
        <Input_Wrapper>
          <div className="signUp-name-label">
            <label>이름</label>
          </div>
          <Input_Box>
            <TextInput
              type={"text"}
              name={"user_name"}
              placeholder={"이름을 입력하세요"}
              value={signUpForm.user_name}
              onChange={handleChange}
            />
          </Input_Box>
        </Input_Wrapper>
        <Input_Wrapper>
          <div className="signUp-tel-label">
            <label>TEL</label>
          </div>
          <Phone_Input>
            <Phone_Box>
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
              <label>-</label>
              <Input_Box>
                <TextInput
                  type={"text"}
                  name={"mid_tel"}
                  placeholder={"1234"}
                  maxLength={4}
                  value={userTel.mid_tel}
                  onChange={handleInputTelChange}
                />
              </Input_Box>
              <label>-</label>
              <Input_Box>
                <TextInput
                  type={"text"}
                  name={"last_tel"}
                  placeholder={"5678"}
                  maxLength={4}
                  value={userTel.last_tel}
                  onChange={handleInputTelChange}
                />
              </Input_Box>
            </Phone_Box>
          </Phone_Input>
        </Input_Wrapper>
        <Input_Wrapper>
          <label>EMAIL</label>
          <Email_Input>
            <Email_Box>
              <Input_Box>
                <TextInput
                  type={"text"}
                  name={"email_id"}
                  placeholder={"EMAIL 입력"}
                  value={userEmail.email_id}
                  onChange={handleInputEmailChange}
                />
              </Input_Box>
              <label>@</label>
              <Select
                className={"selectEmail"}
                options={[
                  { value: "naver.com", label: "naver.com" },
                  { value: "hanmail.net", label: "hanmail.net" },
                  { value: "daum.net", label: "daum.net" },
                  { value: "gmail.com", label: "gmail.com" },
                  { value: "nate.com", label: "nate.com" },
                  { value: "hotmail.com", label: "hotmail.com" },
                  { value: "outlook.com", label: "outlook.com" },
                  { value: "icloud.com", label: "icloud.com" },
                ]}
                defaultValue={"naver.com"}
                onChange={handleSelectEmailChange}
              />
            </Email_Box>
            <Button
              className={"checkEmail"}
              btnTxt={"중복확인"}
              onClick={checkEmailDuplicate}
            />
          </Email_Input>
          {/*이메일 중복 확인 결과 출력 */}
          {emailCheckResult !== null && <p>{emailCheckResult}</p>}
        </Input_Wrapper>
        <Input_Wrapper>
          <div className="signUp-pw-label">
            <label>비밀번호</label>
          </div>
          <Input_Box>
            <TextInput
              type={"password"}
              name={"user_password"}
              placeholder={"비밀번호를 입력하세요"}
              value={signUpForm.user_password}
              onChange={handleChange}
            />
          </Input_Box>
        </Input_Wrapper>
        <p style={{ color: "gray", fontSize: "10px" }}>
          비밀번호는 영어+숫자+특수문자 조합으로 8자 이상이어야 합니다.
        </p>
        <Input_Wrapper>
          <div className="signUp-pw-check-label">
            <label>비밀번호 확인</label>
          </div>
          <Input_Box>
            <TextInput
              type={"password"}
              name={"user_password_check"}
              placeholder={"비밀번호를 입력하세요"}
              value={signUpForm.user_password_check}
              onChange={handleChange}
            />
          </Input_Box>
        </Input_Wrapper>
        {passwordMatch === false && (
          <p style={{ color: "red", fontSize: "10px" }}>
            비밀번호가 일치하지 않습니다.
          </p>
        )}
        <Input_Wrapper>
          <div className="signUp-baseAddr-label">
            <label>기본주소</label>
          </div>
          <Post_Wrapper>
            <Button
              className={"searchAddr"}
              btnTxt={"도로명/지번 주소검색"}
              onClick={handleOpenPostCode}
            />
            <BaseAddress>
              <TextInput
                type={"text"}
                name={"base_address"}
                value={userAddress.base_address}
                readOnly
              />
            </BaseAddress>
            <Modal
              isOpen={isPostCodeOpen}
              onRequestClose={handleClosePostCode}
              style={customModalStyle}
            >
              <PostCodeModal
                onClose={handleClosePostCode}
                onSelectAddress={handleSelectAddress}
              />
            </Modal>
          </Post_Wrapper>
        </Input_Wrapper>
        <Input_Wrapper>
          <div className="signUp-detailAddr-label">
            <label>상세주소</label>
          </div>
          <Input_Box>
            <TextInput
              type={"text"}
              name={"detail_address"}
              placeholder={"상세주소를 입력하세요"}
              value={userAddress.detail_address}
              onChange={handleInputAddressChange}
            />
          </Input_Box>
        </Input_Wrapper>
        <Input_Wrapper>
          <div className="signUp-nickname-label">
            <label>닉네임 설정</label>
          </div>
          <Nickname_Box>
            <Input_Box>
              <TextInput
                type={"text"}
                name={"user_nickname"}
                placeholder={"닉네임을 입력하세요"}
                value={user_nickname}
                onChange={handleChange}
              />
            </Input_Box>
            <Button
              className={"checkNickname"}
              name={"user_nickname"}
              value={signUpForm.user_nickname}
              btnTxt={"중복확인"}
              onClick={checkNicknameDuplicate}
            />
          </Nickname_Box>
        </Input_Wrapper>
        {nicknameCheckResult && <p>{nicknameCheckResult}</p>}
        <Input_Wrapper>
          <div className="signUp-profileImg-label">
            <label>프로필 사진</label>
          </div>
          <Input_Box>
            <FileUpload accpet={"image/*"} onChange={handleFileChange} />
          </Input_Box>
        </Input_Wrapper>
        <Button_Wrapper>
          <Button
            className={"signUp"}
            btnTxt={"회원가입"}
            onClick={handleRegister}
          />
          <Button
            className={"cancel"}
            btnTxt={"취소"}
            onClick={() => navigate("/")}
          />
        </Button_Wrapper>
      </Container_Style>
    </Wrapper>
  );
};

export default SignUp;
