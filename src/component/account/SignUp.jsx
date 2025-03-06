import styled from "styled-components";
import { useState } from "react";
import Button from "../common/Button";
import Select from "../common/Select";
import TextInput from "../common/TextInput";
import PostCodeModal from "./PostCodeModal";
import Modal from "react-modal";
import FileUpload from "../common/FileUpload";

const SignUp = () => {
  const style = {
    display: "flex",
    transition: "all 0.5s",
  };

  // 전체를 감싸는 div
  const Wrapper = styled.div`
    padding: 50px;
  `;

  // wrapper 안에서 컨텐츠를 감싸는 div
  const SignUpPage = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    border: 1px solid black;
    box-shadow: 0 0 30px 20px rgba(0, 0, 0, 0.05);
    align-items: center;
    justify-content: center;
    padding: 50px;
    margin: 0 auto;
  `;

  // 상단의 페이지 제목을 감싸는 style
  const SignUp_Title = styled.h2`
    width: 100%;
    text-align: left;
    font-size: 40pt;
    color: black;
    margin: 0;
  `;

  // button용 통합 style
  const Button = styled.button`
    padding: 10px;
    border: 1px solid black;
    transition: all 0.5s;
    color: black;
    background-color: white;
    text-decoration: none;
    font-size: 12pt;
    &:hover {
      background-color: black;
      color: white;
      text-decoration: none;
    }
  `;

  // label용 통합 style
  const Label = styled.label`
    width: 150px;
    font-size: 12pt;
    color: black;
    text-align: left;
    font-weight: bold;
  `;

  // Input과 이름을 감싸는 div
  const SignUp_Box = styled.div`
    width: -webkit-fill-available;
    height: fit-content;
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
  `;

  // button을 감싸는 div
  const Button_Box = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
  `;

  // button_box 안에서 input을 감싸는 div
  const Input_Box = styled.div`
    width: -webkit-fill-available;
    border: 1px solid black;
    padding: 10px;
    text-align: left;
  `;

  // input의 style
  const Input = styled.input`
    height: 100%;
    font-size: 12pt;
    color: black;
    background: white;
    border: none;

    &:focus {
      outline: none;
    }

    &::file-selector-button {
      font-size: 12pt;
      border: 1px solid black;
      color: black;
      background-color: white;
      transition: all 0.5s;
    }

    &::file-selector-button:hover {
      background-color: black;
      color: white;
    }
  `;
  // input의 style
  const FileUpload = styled.input`
    height: 100%;
    font-size: 12pt;
    color: black;
    background: white;
    border: none;

    &:focus {
      outline: none;
    }

    &::file-selector-button {
      font-size: 12pt;
      border: 1px solid black;
      color: black;
      background-color: white;
      transition: all 0.5s;
    }

    &::file-selector-button:hover {
      background-color: black;
      color: white;
    }
  `;

  const Input_Wrapper = styled.div`
    width: -webkit-fill-available;
    display: flex;
    flex-direction: row;
    height: 45px;
    align-items: center;
    gap: 20px;
  `;

  // select의 style
  const Select = styled.select`
    width: 100%;
    height: 45px;
    font-size: 12pt;
    padding: 10px;
    background-color: white;
    color: black;
    border: 1px solid black;

    &.optionList {
      border-radius: 0;
    }
  `;

  // signup_box안에서 select를 감싸는 div
  const Select_Box = styled.div`
    width: -webkit-fill-available;
    height: fit-content;
    color: black;
  `;

  // 속성 p의 style
  const SignUp_Text = styled.p`
    width: fit-content;
    color: black;
  `;

  // ------------------------------ 상단 style ------------------------------

  const customModalStyle = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
      left: "0",
      margin: "auto",
      width: "500px",
      height: "600px",
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

  const [userAddress, setUserAddress] = useState({
    base_address: "",
    detail_address: "",
  });

  const [isPostCodeOpen, setIsPostCodeOpen] = useState(false);

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
    username,
    userpassword,
    user_password_check,
    usernickname,
    userprofileimg,
  } = signUpForm;

  const { first_tel, mid_tel, last_tel } = userTel;

  const { email_id, email_address } = userEmail;

  const { base_address, detail_address } = userAddress;

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
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

  const handleInputAddressChange = (e) => {
    const { name, value } = e.target;
    setUserAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const full_address = `${base_address},${detail_address}`;
  console.log(full_address);

  return (
    <Wrapper>
      <SignUpPage>
        <SignUp_Title>REGISTER</SignUp_Title>

        <SignUp_Box>
          <Label>이름</Label>
          <Input_Box>
            <Input
              type={"text"}
              name={"user_name"}
              placeholder={"이름을 입력하세요"}
              value={signUpForm.user_name}
              onChange={handleChange}
            />
          </Input_Box>
        </SignUp_Box>
        <SignUp_Box>
          <Label>TEL</Label>
          <Input_Wrapper>
            <Select_Box>
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
            </Select_Box>

            <SignUp_Text>-</SignUp_Text>

            <Input_Box>
              <Input
                type={"text"}
                name={"mid_tel"}
                placeholder={"1234"}
                value={userTel.mid_tel}
                onChange={handleInputTelChange}
              />
            </Input_Box>

            <SignUp_Text>-</SignUp_Text>

            <Input_Box>
              <Input
                type={"text"}
                name={"last_tel"}
                placeholder={"5678"}
                value={userTel.last_tel}
                onChange={handleInputTelChange}
              />
            </Input_Box>
          </Input_Wrapper>
        </SignUp_Box>
        <SignUp_Box>
          <Label>EMAIL</Label>
          <Input_Wrapper>
            <Input_Box>
              <Input
                type={"text"}
                name={"email_id"}
                placeholder={"EMAIL 입력"}
                value={userEmail.email_id}
                onChange={handleInputEmailChange}
              />
            </Input_Box>
            <SignUp_Text>@</SignUp_Text>
            <Select_Box>
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
            </Select_Box>
            <Button_Box>
              <Button className={"checkEmail"} btnTxt={"중복확인"} />
            </Button_Box>
          </Input_Wrapper>
        </SignUp_Box>
        <SignUp_Box>
          <Label>비밀번호</Label>
          <Input_Box>
            <Input
              type={"password"}
              name={"user_password"}
              placeholder={"비밀번호를 입력하세요"}
              value={signUpForm.user_password}
              onChange={handleChange}
            />
          </Input_Box>
        </SignUp_Box>
        <SignUp_Box>
          <Label>비밀번호 확인</Label>
          <Input_Wrapper>
            <Input_Box>
              <Input
                type={"password"}
                name={"user_password_check"}
                placeholder={"비밀번호를 입력하세요"}
                value={signUpForm.user_password_check}
                onChange={handleChange}
              />
            </Input_Box>
            <Button_Box>
              <Button className={"checkPW"} btnTxt={"비밀번호 확인"} />
            </Button_Box>
          </Input_Wrapper>
        </SignUp_Box>
        <SignUp_Box>
          <Label>기본주소</Label>
          <Input_Wrapper>
            <Input_Box>
              <Input
                type={"text"}
                name={"base_address"}
                value={userAddress.base_address}
                readOnly
              />
            </Input_Box>
            <Button_Box>
              <Button
                className={"searchAddr"}
                btnTxt={"도로명/지번 주소검색"}
                onClick={handleOpenPostCode}
              />
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
            </Button_Box>
          </Input_Wrapper>
        </SignUp_Box>
        <SignUp_Box>
          <Label>상세주소</Label>
          <Input_Box>
            <Input
              type={"text"}
              name={"detail_address"}
              placeholder={"상세주소를 입력하세요"}
              value={userAddress.detail_address}
              onChange={handleInputAddressChange}
            />
          </Input_Box>
        </SignUp_Box>
        <SignUp_Box>
          <Label>닉네임 설정</Label>
          <Input_Wrapper>
            <Input_Box>
              <Input type="text" placeholder="닉네임을 입력하세요" />
            </Input_Box>
            <Button_Box>
              <Button className={"checkNickname"} btnTxt={"중복확인"} />
            </Button_Box>
          </Input_Wrapper>
        </SignUp_Box>
        <SignUp_Box>
          <Label>프로필 사진</Label>
          <Input_Box>
            <FileUpload />
          </Input_Box>
        </SignUp_Box>
        <Button_Box>
          <Button className={"signUp"} btnTxt={"회원가입"} />
          <Button className={"cancel"} btnTxt={"취소"} />
        </Button_Box>
      </SignUpPage>
    </Wrapper>
  );
};

export default SignUp;
