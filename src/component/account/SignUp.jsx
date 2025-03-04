const SignUp = () => {
  const style = {
    display: "flex",
  };

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
        </div>
      </div>
      <div className="signUp-tel" style={style}>
        <div className="signUp-tel-label">
          <label>TEL</label>
        </div>
        <div className="signUp-tel-select">
          <select>
            <option value="010">010</option>
            <option value="011">011</option>
            <option value="02">02</option>
            <option value="031">031</option>
          </select>
        </div>
        <div>
          <label>-</label>
        </div>
        <div className="signUp-tel-middle">
          <input type="text" placeholder="1234" />
        </div>
        <div>
          <label>-</label>
        </div>
        <div className="signUp-tel-last">
          <input type="text" placeholder="5678" />
        </div>
      </div>
      <div className="signUp-email" style={style}>
        <div className="signUp-email-label">
          <label>EMAIL</label>
        </div>
        <div className="signUp-email-input">
          <input type="text" placeholder="EMAIL 입력" />
        </div>
        <div className="signUp-email-label">
          <label>@</label>
        </div>
        <div className="signUp-email-select">
          <select>
            <option value="naver.com">naver.com</option>
            <option value="hanmail.net">hanmail.net</option>
            <option value="daum.net">daum.net</option>
            <option value="gmail.com">gmail.com</option>
            <option value="nate.com">nate.com</option>
            <option value="hotmail.com">hotmail.com</option>
            <option value="outlook.com">outlook.com</option>
            <option value="icloud.com">icloud.com</option>
          </select>
        </div>
        <div className="signUp-email-btn">
          <button>중복확인</button>
        </div>
      </div>
      <div className="signUp-pw" style={style}>
        <div className="signUp-pw-label">
          <label>비밀번호</label>
        </div>
        <div className="signUp-pw-input">
          <input type="password" placeholder="비밀번호를 입력하세요" />
        </div>
      </div>
      <div className="signUp-pw-check" style={style}>
        <div className="signUp-pw-check-label">
          <label>비밀번호 확인</label>
        </div>
        <div className="signUp-pw-check-input">
          <input type="password" placeholder="비밀번호를 입력하세요" />
        </div>
        <div className="signUp-pw-check-btn">
          <button>비밀번호 확인</button>
        </div>
      </div>
      <div className="signUp-baseAddr" style={style}>
        <div className="signUp-baseAddr-label">
          <label>기본주소</label>
        </div>
        <div className="signUp-baseAddr-input">
          <input type="text" />
        </div>
        <div className="signUp-baseAddr-btn">
          <button>도로명/지번 주소검색</button>
        </div>
      </div>
      <div className="signUp-detailAddr" style={style}>
        <div className="signUp-detailAddr-label">
          <label>상세주소</label>
        </div>
        <div className="signUp-detailAddr-input">
          <input type="text" placeholder="상세 주소를 입력하세요" />
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
          <button>중복확인</button>
        </div>
      </div>
      <div className="signUp-profileImg" style={style}>
        <div className="signUp-profileImg-label">
          <label>프로필 사진</label>
        </div>
        <div className="signUp-profileImg-input">
          <input type="file" />
        </div>
      </div>
      <div className="signUp-btns" style={style}>
        <button>회원가입</button>
        <button>취소</button>
      </div>
    </div>
  );
};

export default SignUp;
