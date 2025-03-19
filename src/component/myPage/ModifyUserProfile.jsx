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
import { Button_Wrapper } from "../../style/Product_detail_style";
import {
  Email_Box,
  Email_Input,
  Nickname_Box,
  Phone_Box,
  Phone_Input,
  Post_Wrapper,
} from "../../style/SignUp_Style";

const ModifyUserProfile = () => {
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

  const location = useLocation();
  const userData = location.state;

  console.log("메인에서 넘어온 회원정보:", userData);

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
      if (response.data.exists) {
        // 받아온 데이터가 true일 경우
        console.log("response 데이터 : " + response.data.exists);
        setNicknameCheckResult("이미 사용중인 닉네임입니다.");
        setIsNicknameChecked(false);
      } else {
        console.log("response 데이터 : " + response.data.exists);
        setNicknameCheckResult("사용 가능한 닉네임입니다.");
        setIsNicknameChecked(true);
      }
    } catch (error) {
      console.error("닉네임 중복 확인 요청 실패 : ", error);
      setNicknameCheckResult("오류발생");
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
      alert("비밀번호를 입력하세요.");
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
        alert("비밀번호 확인 완료");
        setIsPasswordChecked(true);
      } else {
        alert("비밀번호가 일치하지 않습니다.");
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
      alert("필수항목을 입력해주세요.");
      return;
    }

    if (user_nickname !== userData.USER_NICKNAME && !isNicknameChecked) {
      alert("닉네임 중복 확인을 해주세요.");
      return;
    }

    if (!isPasswordChecked) {
      alert("비밀번호 확인을 해주세요");
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
          }
        );
      }

      console.log("회원정보 수정 서버 응답:", response.data);

      if (response.data.success) {
        alert("회원정보가 수정되었습니다.");
        sessionStorage.setItem("token", response.data.token); // 수정된 유저 정보로 발급된 토큰 sessionStorage에 저장
        navigate("/mypage");
      } else {
        alert("회원정보 수정에 실패하였습니다.");
      }
    } catch (error) {
      console.error("회원정보 수정 요청 실패:", error);
      alert("회원정보 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      {userData && userData.USER_EMAIL ? (
        <Wrapper className="cm" id="register">
          <Container_Style>
            <div className="signUp-title">
              <h2>회원정보 수정</h2>
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
                      placeholder={"EMAIL 입력"}
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
                    value={base_address}
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
                  value={detail_address}
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
                  btnTxt={"중복확인"}
                  onClick={checkNicknameDuplicate}
                />
                {nicknameCheckResult && <p>{nicknameCheckResult}</p>}
              </Nickname_Box>
            </Input_Wrapper>
            {/* {nicknameCheckResult && <p>{nicknameCheckResult}</p>} */}
            <Input_Wrapper>
              <div className="signUp-profileImg-label">
                <label>프로필 사진</label>
              </div>
              <Input_Box>
                <FileUpload accpet={"image/*"} onChange={handleFileChange} />
              </Input_Box>
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
                  // value={user_password}
                  onChange={handleChange}
                />
              </Input_Box>
            </Input_Wrapper>
            <Button
              className={"checkPw"}
              btnTxt={"비밀번호 확인"}
              onClick={handleCheckPassword}
            />
            <Button_Wrapper>
              <Button
                className={"signUp"}
                btnTxt={"정보수정"}
                onClick={handleModifyUser}
              />
              <Button
                className={"cancel"}
                btnTxt={"취소"}
                onClick={() => navigate("/myPage")}
              />
            </Button_Wrapper>
          </Container_Style>
        </Wrapper>
      ) : (
        <p>회원 정보를 불러오는 중...</p> // 데이터가 없으면 로딩 메시지 출력
      )}
    </div>
  );
};

export default ModifyUserProfile;
