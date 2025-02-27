const FindPw = () => {
  const style = {
    display: "flex",
  };

  return (
    <div className="findPwPage">
      <div className="findPw-title">
        <h2>비밀번호 찾기</h2>
      </div>
      <div className="findPw-name" style={style}>
        <div className="findPw-name-label">
          <label>이름</label>
        </div>
        <div className="findPw-name=input">
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
        <button>비밀번호 찾기</button>
        <button>취소</button>
      </div>
    </div>
  );
};

export default FindPw;
