import { useState } from "react";
import Button from "../common/Button";

const FindPw = ({ onBack }) => {
  const style = {
    display: "flex",
  };

  // 비밀번호 찾기/재설정 화면을 각각 나누어서 관리하는 상태관리 변수
  const [findPwView, setFinePwView] = useState("check");

  return (
    <div className="findPwPage">
      {findPwView === "check" && (
        <div className="findPwPage-checkInfo">
          <div className="findPw-title">
            <h2>비밀번호 찾기</h2>
          </div>
          <div className="findPw-name" style={style}>
            <div className="findPw-name-label">
              <label>이름</label>
            </div>
            <div className="findPw-name-input">
              <input type="text" placeholder="이름을 입력하세요" />
            </div>
          </div>
          <div className="findPw-email" style={style}>
            <div className="findPw-email-label">
              <label>EMAIL</label>
            </div>
            <div className="findPw-email-input">
              <input type="text" placeholder="EMAIL을 입력하세요" />
            </div>
          </div>
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
        </div>
      )}
      {findPwView === "reset" && (
        <div className="findPwPage-resetPw">
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
        </div>
      )}
    </div>
  );
};

export default FindPw;
