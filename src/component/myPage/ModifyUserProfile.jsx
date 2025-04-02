import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
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
import PostCodeModal from "../account/PostCodeModal";
import { Button_Wrapper } from "../../style/Product_Detail_Style";
import {
  Email_Box,
  Email_Input,
  Nickname_Box,
  Phone_Box,
  Phone_Input,
  Post_Wrapper,
} from "../../style/SignUp_Style";

const ModifyUserProfile = () => {
  const location = useLocation();
  const userData = location.state;

  console.log("메인에서 넘어온 회원정보:", userData);

  const oldNickname = userData.nickname;

  const navigate = useNavigate();

  const [modifyUserForm, setModifyUserForm] = useState({
    user_name: userData?.USER_NAME || "",
    user_password: userData?.USER_PASSWORD || "",
    user_nickname: userData?.USER_NICKNAME || "",
    user_profileimg: userData?.USER_PROFILE || "",
  });

  const { user_name, user_password, user_nickname, user_profileimg } =
    modifyUserForm;

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setModifyUserForm({
      ...modifyUserForm,
      [name]: value,
    });
  };

  const full_email = `${userData.USER_EMAIL.email_id}@${userData.USER_EMAIL.email_address}`;

  const [userTel, setUserTel] = useState({
    first_tel: userData?.USER_TEL?.first_tel || "010",
    mid_tel: userData?.USER_TEL?.mid_tel || "",
    last_tel: userData?.USER_TEL?.last_tel || "",
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

  const [userAddress, setUserAddress] = useState({
    base_address: userData?.USER_ADDR.base_address || "",
    detail_address: userData?.USER_ADDR.detail_address || "",
  });

  const { base_address, detail_address } = userAddress;

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

  const handleInputAddressChange = (e) => {
    const { name, value } = e.target;
    setUserAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const full_address = `${base_address},${detail_address}`;
  console.log(full_address);

  // 닉네임 중복 확인 결과
  const [nicknameCheckResult, setNicknameCheckResult] = useState(null);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  // 닉네임 중복 확인 요청
  const checkNicknameDuplicate = async () => {
    if (!user_nickname) {
      alert("Please Enter your Nickname");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users/check-nickname`,
        {
          params: { nickname: user_nickname },
        }
      );
      if (response.data.exists) {
        // 받아온 데이터가 true일 경우
        console.log("response 데이터 : " + response.data.exists);
        setNicknameCheckResult("This nickname is already in use.");
        setIsNicknameChecked(false);
      } else {
        console.log("response 데이터 : " + response.data.exists);
        setNicknameCheckResult("This nickname is available.");
        setIsNicknameChecked(true);
      }
    } catch (error) {
      console.error("닉네임 중복 확인 요청 실패 : ", error);
      setNicknameCheckResult("Server Error");
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // 사용자가 선택한 파일
    console.log("선택한 이미지 파일:", file);
    setSelectedFile(file);
  };

  const [isPasswordChecked, setIsPasswordChecked] = useState(false);

  // 비밀번호 확인 요청
  const handleCheckPassword = async () => {
    if (!user_password) {
      alert("Please Enter your Password");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/users/login`,
        {
          email: full_email,
          password: user_password,
        }
      );

      console.log("비밀번호 조회 서버 응답:", response.data); // 서버 응답 확인

      if (response.data.success) {
        // 받아온 데이터가 true일 경우
        alert("Password confirmed");
        setIsPasswordChecked(true);
      } else {
        alert("Passwords do not match.");
        setIsPasswordChecked(false);
      }
    } catch (error) {
      console.error("비밀번호 확인 요청 실패 : ", error);
      setIsPasswordChecked(false);
    }
  };

  const handleModifyUser = async (e) => {
    e.preventDefault();
    if (
      !user_name ||
      !mid_tel ||
      !last_tel ||
      !base_address ||
      !detail_address ||
      !user_nickname
    ) {
      alert("Please enter all required information to edit profile.");
      return;
    }

    if (user_nickname !== userData.USER_NICKNAME && !isNicknameChecked) {
      alert("Please check if this nickname is already taken.");
      return;
    }

    if (!isPasswordChecked) {
      alert("Passwords do not match.");
      return;
    }

    try {
      let response;

      if (selectedFile) {
        // 새로운 프로필 이미지가 선택된 경우 -> FormData 사용
        const formData = new FormData();
        formData.append("user_email", full_email);
        formData.append("user_name", user_name);
        formData.append("user_nickname", user_nickname);
        formData.append("user_tel", full_tel);
        formData.append("user_addr", full_address);
        formData.append("user_profile", selectedFile);
        formData.append("oldNickname", userData.USER_NICKNAME);

        console.log("회원정보 수정 데이터:", formData);

        response = await axios.post(
          "http://localhost:8080/api/users/updateProfileWithImage",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        // 새로운 프로필 이미지가 없는 경우 -> 일반 JSON 요청
        response = await axios.post(
          "http://localhost:8080/api/users/updateProfile",
          {
            user_email: full_email,
            user_name: user_name,
            user_nickname: user_nickname,
            user_tel: full_tel,
            user_addr: full_address,
            oldNickname: userData.USER_NICKNAME,
          }
        );
      }

      console.log("회원정보 수정 서버 응답:", response.data);

      if (response.data.success) {
        alert("Your profile has been updated.");
        sessionStorage.setItem("token", response.data.token); // 수정된 유저 정보로 발급된 토큰 sessionStorage에 저장
        navigate("/mypage");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("회원정보 수정 요청 실패:", error);
      alert("Server Error");
    }
  };

  return (
    <Wrapper className="nomargin" id="modiuser">
      {userData && userData.USER_EMAIL ? (
        <Wrapper className="wrap" id="register">
          <Container_Style className="wrap">
            <div className="signUp-title">
              <h2>Edit Profile</h2>
            </div>
            <Input_Wrapper>
              <div className="signUp-name-label">
                <label>NAME</label>
              </div>
              <Input_Box>
                <TextInput
                  type={"text"}
                  name={"user_name"}
                  placeholder={"Please Enter your Name"}
                  value={user_name}
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
                    defaultValue={first_tel}
                    onChange={handleSelectTelChange}
                  />
                  <label>-</label>
                  <Input_Box>
                    <TextInput
                      type={"text"}
                      name={"mid_tel"}
                      placeholder={"1234"}
                      maxLength={4}
                      value={mid_tel}
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
                      value={last_tel}
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
                      placeholder={"Please Enter your Email"}
                      value={userData.USER_EMAIL.email_id}
                      disabled
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
                    defaultValue={userData.USER_EMAIL.email_address}
                    disabled={true}
                  />
                </Email_Box>
              </Email_Input>
            </Input_Wrapper>
            <Input_Wrapper>
              <div className="signUp-baseAddr-label">
                <label>ADDRESS 1</label>
              </div>
              <Post_Wrapper>
                <Button
                  className={"searchAddr"}
                  btnTxt={"Search"}
                  onClick={handleOpenPostCode}
                />
                <BaseAddress>
                  <TextInput
                    type={"text"}
                    name={"base_address"}
                    value={base_address}
                    readOnly
                  />
                </BaseAddress>
                <Modal
                  isOpen={isPostCodeOpen}
                  onRequestClose={handleClosePostCode}
                  style={{
                    overlay: {
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "rgba(0, 0, 0, 0.5)", // 배경색
                      zIndex: 300,
                    },
                    content: {
                      width: "40%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                      position: "static", // static으로 변경
                      background: "white",
                      padding: "20px",
                      borderRadius: "0",
                      border: "none",
                      padding: "50px",
                    },
                  }}
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
                <label>ADDRESS 2</label>
              </div>
              <Input_Box>
                <TextInput
                  type={"text"}
                  name={"detail_address"}
                  placeholder={"Please Enter your Address"}
                  value={detail_address}
                  onChange={handleInputAddressChange}
                />
              </Input_Box>
            </Input_Wrapper>
            <Input_Wrapper>
              <div className="signUp-nickname-label">
                <label>NICKNAME</label>
              </div>
              <Nickname_Box>
                <Input_Box>
                  <TextInput
                    type={"text"}
                    name={"user_nickname"}
                    placeholder={"Please Enter your Nickname"}
                    value={user_nickname}
                    onChange={handleChange}
                  />
                </Input_Box>
                <Button
                  className={"checkNickname"}
                  btnTxt={"Check Duplicate"}
                  onClick={checkNicknameDuplicate}
                />
                {nicknameCheckResult && <p>{nicknameCheckResult}</p>}
              </Nickname_Box>
            </Input_Wrapper>
            {/* {nicknameCheckResult && <p>{nicknameCheckResult}</p>} */}
            <Input_Wrapper>
              <div className="signUp-profileImg-label">
                <label>PROFILE IMAGE</label>
              </div>
              <Input_Box>
                <FileUpload accpet={"image/*"} onChange={handleFileChange} />
              </Input_Box>
            </Input_Wrapper>
            <Input_Wrapper>
              <div className="signUp-pw-label">
                <label>PASSWORD</label>
              </div>
              <Input_Box>
                <TextInput
                  type={"password"}
                  name={"user_password"}
                  placeholder={"Please Enter your Password"}
                  // value={user_password}
                  onChange={handleChange}
                />
              </Input_Box>
            </Input_Wrapper>
            <Button
              className={"checkPw"}
              btnTxt={"Confirm Password"}
              onClick={handleCheckPassword}
            />
            <Button_Wrapper>
              <Button
                className={"signUp"}
                btnTxt={"EDIT"}
                onClick={handleModifyUser}
              />
              <Button
                className={"cancel"}
                btnTxt={"CANCEL"}
                onClick={() => navigate("/myPage")}
              />
            </Button_Wrapper>
          </Container_Style>
        </Wrapper>
      ) : (
        <p>loading...</p> // 데이터가 없으면 로딩 메시지 출력
      )}
    </Wrapper>
  );
};

export default ModifyUserProfile;
