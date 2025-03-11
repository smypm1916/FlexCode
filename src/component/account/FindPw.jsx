import { useState } from "react";
import Button from "../common/Button";
import {
  Container_Modal,
  Input_Box,
  Input_Style,
  Input_Wrapper,
  Modal_Wrapper,
} from "../../style/Common_Style";
import { Title } from "../../style/Modal_Style";

const FindPw = ({ onBack }) => {
  const style = {
    display: "flex",
  };

  // 비밀번호 찾기/재설정 화면을 각각 나누어서 관리하는 상태관리 변수
  const [findPwView, setFinePwView] = useState("check");

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
              <Input_Style type="text" placeholder="이름을 입력하세요" />
            </Input_Box>
          </Input_Wrapper>
          <Input_Wrapper>
            <div className="findPw-email-label">
              <label>EMAIL</label>
            </div>
            <div className="findPw-email-input">
              <input type="text" placeholder="EMAIL을 입력하세요" />
            </div>
          </Input_Wrapper>
          <div className="findPw-btns" style={style}>
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
              onClick={() => {
                setFinePwView("reset");
              }}
            />
            <Button className={"calcel"} btnTxt={"취소"} onClick={onBack} />
          </div>
        </Modal_Wrapper>
      )}
      {findPwView === "reset" && (
        <Modal_Wrapper>
          <div className="findPw-title">
            <h2>비밀번호 재설정</h2>
          </div>
          <div className="findPw-password" style={style}>
            <div className="findPw-password-label">
              <label>새 비밀번호</label>
            </div>
            <div className="findPw-password-input">
              <input type="password" placeholder="비밀번호를 입력하세요" />
            </div>
          </div>
          <div className="findPw-password-check" style={style}>
            <div className="findPw-password-check_label">
              <label>비밀번호 확인</label>
            </div>
            <div className="findPw-password-check-input">
              <input type="password" placeholder="비밀번호를 입력하세요" />
            </div>
          </div>
          <div className="findPw-btns" style={style}>
            <Button className={"resetPw"} btnTxt={"설정하기"} />
            <Button className={"cancel"} btnTxt={"취소"} onClick={onBack} />
          </div>
        </Modal_Wrapper>
      )}
    </Container_Modal>
  );
};

export default FindPw;
