import {
  Button_Wrapper_100,
  Container_Style,
  Input_Box,
  Input_Style,
  Input_Wrapper,
  Textarea_Style,
  Wrapper,
  Title,
} from "../../style/Common_Style";
import { List_Profile, Profile_Img } from "../../style/List_Style";
import Button from "../common/Button";
import FileUpload from "../common/FileUpload";

const CmAdd = () => {
  return (
    <Wrapper className="cmadd">
      <Container_Style>
        <Title>WRITE</Title>
        <List_Profile>
          <Profile_Img>프사</Profile_Img>
        </List_Profile>
        <Input_Wrapper>
          <div>
            <label>제목</label>
          </div>
          <Input_Box>
            <Input_Style type="text" placeholder="제목을 입력하세요" />
          </Input_Box>
        </Input_Wrapper>

        <Input_Wrapper>
          <div>
            <label>내용</label>
          </div>
          <Input_Box>
            <Textarea_Style type="textarea" placeholder="내용을 입력하세요" />
          </Input_Box>
        </Input_Wrapper>
        <Input_Wrapper>
          <label>사진 등록</label>
          <Input_Box>
            <FileUpload type="file" />
          </Input_Box>
        </Input_Wrapper>
        <Button_Wrapper_100>
          <Button btnTxt={"글쓰기"}>글쓰기</Button>
          <Button btnTxt={"뒤로가기"}>뒤로가기</Button>
        </Button_Wrapper_100>
      </Container_Style>
    </Wrapper>
  );
};
export default CmAdd;
