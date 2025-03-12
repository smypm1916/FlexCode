import {
  Button_Wrapper_100,
  Container_Style,
  Input_Wrapper,
  Wrapper,
} from "../../style/Common_Style";
import Button from "../common/Button";
import { List_Profile, Profile_Img } from "../../style/List_Style";

const CmDetail = () => {
  return (
    <Wrapper>
      <Container_Style>
        <List_Profile>
          <Profile_Img>프사</Profile_Img>
          <label>유저</label>
        </List_Profile>
        <Input_Wrapper>
          <div>
            <label>작성일</label>
          </div>
          <div>25/03/05</div>
        </Input_Wrapper>
        <Input_Wrapper>
          <label>제목</label>
          <div className="CmTitle">제목입니다</div>
        </Input_Wrapper>

        <Input_Wrapper>
          <div>
            <label>내용</label>
          </div>
          <div className="CmContent">
            <div>글내용입니다</div>
            <div>이미지입니다</div>
          </div>
        </Input_Wrapper>

        <Button_Wrapper_100>
          <Button btnTxt={"수정하기"}>수정하기</Button>
          <Button btnTxt={"삭제하기"}>삭제하기</Button>
        </Button_Wrapper_100>
      </Container_Style>
    </Wrapper>
  );
};
export default CmDetail;
