import styled from "styled-components";

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

  return (
    <Wrapper>
      <SignUpPage>
        <SignUp_Title>REGISTER</SignUp_Title>

        <SignUp_Box>
          <Label>이름</Label>
          <Input_Box>
            <Input type="text" placeholder="이름을 입력하세요" />
          </Input_Box>
        </SignUp_Box>
        <SignUp_Box>
          <Label>TEL</Label>
          <Input_Wrapper>
            <Select_Box>
              <Select>
                <option value="010">010</option>
                <option value="011">011</option>
                <option value="02">02</option>
                <option value="031">031</option>
              </Select>
            </Select_Box>

            <SignUp_Text>-</SignUp_Text>

            <Input_Box>
              <Input type="text" placeholder="1234" />
            </Input_Box>

            <SignUp_Text>-</SignUp_Text>

            <Input_Box>
              <Input type="text" placeholder="5678" />
            </Input_Box>
          </Input_Wrapper>
        </SignUp_Box>
        <SignUp_Box>
          <Label>EMAIL</Label>
          <Input_Wrapper>
            <Input_Box>
              <Input type="text" placeholder="EMAIL 입력" />
            </Input_Box>
            <SignUp_Text>@</SignUp_Text>
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
            <Button_Box>
              <Button>중복확인</Button>
            </Button_Box>
          </Input_Wrapper>
        </SignUp_Box>
        <SignUp_Box>
          <Label>비밀번호</Label>
          <Input_Box>
            <Input type="password" placeholder="비밀번호를 입력하세요" />
          </Input_Box>
        </SignUp_Box>
        <SignUp_Box>
          <Label>비밀번호 확인</Label>
          <Input_Wrapper>
            <Input_Box>
              <Input type="password" placeholder="비밀번호를 입력하세요" />
            </Input_Box>
            <Button_Box>
              <Button>비밀번호 확인</Button>
            </Button_Box>
          </Input_Wrapper>
        </SignUp_Box>
        <SignUp_Box>
          <Label>기본주소</Label>
          <Input_Wrapper>
            <Input_Box>
              <Input type="text" />
            </Input_Box>
            <Button_Box>
              <Button>도로명/지번 주소검색</Button>
            </Button_Box>
          </Input_Wrapper>
        </SignUp_Box>
        <SignUp_Box>
          <Label>상세주소</Label>
          <Input_Box>
            <Input type="text" placeholder="상세 주소를 입력하세요" />
          </Input_Box>
        </SignUp_Box>
        <SignUp_Box>
          <Label>닉네임 설정</Label>
          <Input_Wrapper>
            <Input_Box>
              <Input type="text" placeholder="닉네임을 입력하세요" />
            </Input_Box>
            <Button_Box>
              <Button>중복확인</Button>
            </Button_Box>
          </Input_Wrapper>
        </SignUp_Box>
        <SignUp_Box>
          <Label>프로필 사진</Label>
          <Input_Box>
            <Input type="file" />
          </Input_Box>
        </SignUp_Box>
        <Button_Box>
          <Button>REGISTER</Button>
          <Button>CANCEL</Button>
        </Button_Box>
      </SignUpPage>
    </Wrapper>
  );
};

export default SignUp;
