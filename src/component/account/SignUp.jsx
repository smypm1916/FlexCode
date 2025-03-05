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
  };

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
    <div className="signUpPage">
      <div className="signUp-title">
        <h2>회원가입</h2>
      </div>
      <div className="signUp-name" style={style}>
        <div className="signUp-name-label">
          <label>이름</label>
        </div>
        <div className="signUp-name-input">
          <input type="text" placeholder="이름을 입력하세요" />
          <TextInput
            type={"text"}
            name={"user_name"}
            placeholder={"이름을 입력하세요"}
            value={signUpForm.user_name}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="signUp-tel" style={style}>
        <div className="signUp-tel-label">
          <label>TEL</label>
        </div>
        <div className="signUp-tel-select">
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
        <div className="signUp-tel-middle">
          <TextInput
            type={"text"}
            name={"mid_tel"}
            placeholder={"1234"}
            value={userTel.mid_tel}
            onChange={handleInputTelChange}
          />
        </div>
        <div>
          <label>-</label>
        </div>
        <div className="signUp-tel-last">
          <TextInput
            type={"text"}
            name={"last_tel"}
            placeholder={"5678"}
            value={userTel.last_tel}
            onChange={handleInputTelChange}
          />
        </div>
      </div>
      <div className="signUp-email" style={style}>
        <div className="signUp-email-label">
          <label>EMAIL</label>
        </div>
        <div className="signUp-email-input">
          <TextInput
            type={"text"}
            name={"email_id"}
            placeholder={"EMAIL 입력"}
            value={userEmail.email_id}
            onChange={handleInputEmailChange}
          />
        </div>
        <div className="signUp-email-label">
          <label>@</label>
        </div>
        <div className="signUp-email-select">
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
        </div>
        <div className="signUp-email-btn">
          <Button className={"checkEmail"} btnTxt={"중복확인"} />
        </div>
      </div>
      <div className="signUp-pw" style={style}>
        <div className="signUp-pw-label">
          <label>비밀번호</label>
        </div>
        <div className="signUp-pw-input">
          <TextInput
            type={"password"}
            name={"user_password"}
            placeholder={"비밀번호를 입력하세요"}
            value={signUpForm.user_password}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="signUp-pw-check" style={style}>
        <div className="signUp-pw-check-label">
          <label>비밀번호 확인</label>
        </div>
        <div className="signUp-pw-check-input">
          <TextInput
            type={"password"}
            name={"user_password_check"}
            placeholder={"비밀번호를 입력하세요"}
            value={signUpForm.user_password_check}
            onChange={handleChange}
          />
        </div>
        <div className="signUp-pw-check-btn">
          <Button className={"checkPW"} btnTxt={"비밀번호 확인"} />
        </div>
      </div>
      <div className="signUp-baseAddr" style={style}>
        <div className="signUp-baseAddr-label">
          <label>기본주소</label>
        </div>
        <div className="signUp-baseAddr-input">
          <TextInput
            type={"text"}
            name={"base_address"}
            value={userAddress.base_address}
            readOnly
          />
        </div>
        <div className="signUp-baseAddr-btn">
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
        </div>
      </div>
      <div className="signUp-detailAddr" style={style}>
        <div className="signUp-detailAddr-label">
          <label>상세주소</label>
        </div>
        <div className="signUp-detailAddr-input">
          <TextInput
            type={"text"}
            name={"detail_address"}
            placeholder={"상세주소를 입력하세요"}
            value={userAddress.detail_address}
            onChange={handleInputAddressChange}
          />
        </div>
      </div>
      <div className="signUp-nickname" style={style}>
        <div className="signUp-nickname-label">
          <label>닉네임 설정</label>
        </div>
        <div className="signUp-nickname-input">
          <input type="text" placeholder="닉네임을 입력하세요" />
        </div>
        <div className="signUp-nickname-btn">
          <Button className={"checkNickname"} btnTxt={"중복확인"} />
        </div>
      </div>
      <div className="signUp-profileImg" style={style}>
        <div className="signUp-profileImg-label">
          <label>프로필 사진</label>
        </div>
        <div className="signUp-profileImg-input">
          <FileUpload />
        </div>
      </div>
      <div className="signUp-btns" style={style}>
        <Button className={"signUp"} btnTxt={"회원가입"} />
        <Button className={"cancel"} btnTxt={"취소"} />
      </div>
    </div>
  );
};

export default SignUp;
