import styled from "styled-components";

const SignUp = () => {
  const style = {
    display: "flex",
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
    box-shadow: 0 0 50px 10px rgba(0, 0, 0, 0.1);
    align-items: center;
    justify-content: center;
    padding: 30px;
    margin: 0 auto;
  `;

  // 상단의 페이지 제목을 감싸는 style
  const Title = styled.h2`
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
    width: 100%;
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
    border: 1px solid black;
    padding: 10px;
  `;

  // input의 style
  const Input = styled.input`
    width: 100%;
    font-size: 12pt;
    color: black;
    background: white;
    border: none;

    &:focus {
      outline: none;
    }
  `;

  // select의 style
  const Select = styled.select`
    font-size: 12pt;
    padding: 10px;
    background-color: white;
    color: black;
    border: 1px solid black;
  `;

  // signup_box안에서 select를 감싸는 div
  const Select_Box = styled.div`
    height: fit-content;
    color: black;
  `;

  // 속성 p의 style
  const P = styled.p`
    width: fit-content;
  `;

  return (
    <Wrapper>
      <SignUpPage>
        <Title>회원가입</Title>

        <SignUp_Box>
          <Label>
            <label>이름</label>
          </Label>
          <Input_Box>
            <Input type="text" placeholder="이름을 입력하세요" />
          </Input_Box>
        </SignUp_Box>
        <SignUp_Box>
          <Label>
            <label>TEL</label>
          </Label>
          <Select_Box>
            <Select>
              <option value="010">010</option>
              <option value="011">011</option>
              <option value="02">02</option>
              <option value="031">031</option>
            </Select>
          </Select_Box>
          <Label>
            <label>-</label>
          </Label>
          <Input_Box>
            <Input type="text" placeholder="1234" />
          </Input_Box>
          <Label>
            <label>-</label>
          </Label>
          <Input_Box>
            <Input type="text" placeholder="5678" />
          </Input_Box>
        </SignUp_Box>
        <SignUp_Box>
          <Label>
            <label>EMAIL</label>
          </Label>
          <Input_Box>
            <Input type="text" placeholder="EMAIL 입력" />
          </Input_Box>
          <Label>
            <P>@</P>
          </Label>
          <Select_Box>
            <Select>
              <option value="naver.com">naver.com</option>
              <option value="hanmail.net">hanmail.net</option>
              <option value="daum.net">daum.net</option>
              <option value="gmail.com">gmail.com</option>
              <option value="nate.com">nate.com</option>
              <option value="hotmail.com">hotmail.com</option>
              <option value="outlook.com">outlook.com</option>
              <option value="icloud.com">icloud.com</option>
            </Select>
          </Select_Box>
          <div className="signUp-email-btn">
            <Button>중복확인</Button>
          </div>
        </SignUp_Box>
        <SignUp_Box>
          <Label>
            <label>비밀번호</label>
          </Label>
          <Input_Box>
            <Input type="password" placeholder="비밀번호를 입력하세요" />
          </Input_Box>
        </SignUp_Box>
        <SignUp_Box>
          <Label>
            <label>비밀번호 확인</label>
          </Label>
          <Input_Box>
            <Input type="password" placeholder="비밀번호를 입력하세요" />
          </Input_Box>
          <div className="signUp-pw-check-btn">
            <Button>비밀번호 확인</Button>
          </div>
        </SignUp_Box>
        <SignUp_Box>
          <Label>
            <label>기본주소</label>
          </Label>
          <Input_Box>
            <Input type="text" />
          </Input_Box>
          <div className="signUp-baseAddr-btn">
            <Button>도로명/지번 주소검색</Button>
          </div>
        </SignUp_Box>
        <SignUp_Box>
          <Label>
            <label>상세주소</label>
          </Label>
          <Input_Box>
            <Input type="text" placeholder="상세 주소를 입력하세요" />
          </Input_Box>
        </SignUp_Box>
        <SignUp_Box>
          <Label>
            <label>닉네임 설정</label>
          </Label>
          <Input_Box>
            <Input type="text" placeholder="닉네임을 입력하세요" />
          </Input_Box>
          <div className="signUp-nickname-btn">
            <Button>중복확인</Button>
          </div>
        </SignUp_Box>
        <SignUp_Box>
          <Label>
            <label>프로필 사진</label>
          </Label>
          <Input_Box>
            <Input type="file" />
          </Input_Box>
        </SignUp_Box>
        <Button_Box>
          <Button>회원가입</Button>
          <Button>취소</Button>
        </Button_Box>
      </SignUpPage>
    </Wrapper>
  );
};

export default SignUp;
