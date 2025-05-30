import axios from "axios";
import { useState } from "react";
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
import { Email_Box } from "../../style/SignUp_Style";
import Button from "../common/Button";

const FindPw = ({ onBack }) => {
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
      alert("名前を入力してください。");
      return;
    }
    if (!email_id) {
      alert("EMAILを入力してください。");
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
        setFindPwView("reset"); // 登録されたユーザーの場合にはパスワードリセット画面に移動
        setErrorMessage(""); // エラーメッセージクリア
      } else {
        setErrorMessage(
          "登録されたユーザーが存在しません。入力情報を確認してください。"
        );
      }
    } catch (error) {
      console.error("パスワード探しリクエスト失敗：", error);
      setErrorMessage("サーバーエラーが発生しました。もう一度お試しください。");
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

  // パスワード有効性チェック
  const [passwordValid, setPasswordValid] = useState(null);

  // パスワード有効性チェック結果
  const [passwordMatch, setPasswordMatch] = useState(null);

  const handlePwChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    console.log(name, value);
    // パスワード有効性チェック
    if (name == "userPassword") {
      setPasswordValid(validatePassword(value));
      setPasswordMatch(password.userPasswordCheck === value);
    }
    // パスワード一致チェック
    if (name == "userPasswordCheck") {
      setPasswordMatch(value === password.userPassword);
    }
    setPassword({
      ...password,
      [name]: value,
    });
  };

  const handleUpdatePw = async () => {
    if (!userPassword) {
      alert("パスワードを入力してください。");
      return;
    }
    if (!userPasswordCheck) {
      alert("パスワードを入力してください。");
    }
    if (!passwordValid) {
      alert("パスワードは英字、数字、特殊文字を含む8文字以上でなければなりません。");
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
        alert("パスワードが正常にリセットされました。");
        onBack();
      } else {
        alert("パスワードリセットに失敗しました。もう一度お試しください。");
        return;
      }
    } catch (error) {
      console.error("パスワードリセットリクエスト失敗", error);
      alert("パスワードリセットに失敗しました。もう一度お試しください。");
    }
  };
  return (
    <Container_Modal>
      {findPwView === "check" && (
        <Modal_Wrapper>
          <div className="findPw-title">
            <Title>パスワード探し</Title>
          </div>
          <Input_Wrapper>
            <div className="findPw-name-label">
              <label>名前</label>
            </div>
            <Input_Box>
              <Input_Style
                type="text"
                placeholder="名前を入力してください"
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
                  placeholder="EMAILを入力してください"
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
              btnTxt={"パスワードリセット"}
              onClick={handleFindUser}
            />
            <Button className={"calcel"} btnTxt={"キャンセル"} onClick={onBack} />
          </Button_Wrapper_100>
        </Modal_Wrapper>
      )}
      {findPwView === "reset" && (
        <Modal_Wrapper>
          <div className="findPw-title">
            <Title>パスワードリセット</Title>
          </div>
          <Input_Wrapper>
            <div className="findPw-password-label">
              <label>新しいパスワード</label>
            </div>
            <Input_Box>
              <Input_Style
                type="password"
                name="userPassword"
                placeholder="新しいパスワードを入力してください"
                value={userPassword}
                onChange={handlePwChange}
              />
            </Input_Box>
          </Input_Wrapper>
          <p style={{ color: "gray", fontSize: "10px" }}>
            パスワードは英字、数字、特殊文字を含む8文字以上でなければなりません。
          </p>
          <Input_Wrapper>
            <div className="findPw-password-check_label">
              <label>新しいパスワード確認</label>
            </div>
            <Input_Box>
              <Input_Style
                type="password"
                name="userPasswordCheck"
                // placeholder="비밀번호를 입력하세요"
                value={userPasswordCheck}
                onChange={handlePwChange}
              />
            </Input_Box>
          </Input_Wrapper>
          {passwordMatch === false && (
            <p style={{ color: "red", fontSize: "10px" }}>
              パスワードが一致しません
            </p>
          )}
          <Button_Wrapper_100>
            <Button
              className={"resetPw"}
              btnTxt={"リセット"}
              onClick={handleUpdatePw}
            />
            <Button className={"cancel"} btnTxt={"キャンセル"} onClick={onBack} />
          </Button_Wrapper_100>
        </Modal_Wrapper>
      )}
    </Container_Modal>
  );
};

export default FindPw;
