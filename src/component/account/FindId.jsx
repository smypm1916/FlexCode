import { useState } from "react";
import Button from "../common/Button";
import {
  Container_Modal,
  Input_Box,
  Input_Style,
  Modal_Wrapper,
  Select_Style,
  Input_Wrapper,
} from "../../style/Common_Style";
import { Button_Wrapper } from "../../style/Product_detail_style";
import { Phone_Box, Title } from "../../style/Modal_Style";
const FindId = ({ onBack, onClose }) => {
  const style = {
    display: "flex",
  };

  // 현재 선택된 select option이 가지고 있는 value값을 저장할 상태관리 변수
  const [selectedTelOption, setSelectedTelOption] = useState("010");

  // select 태그에서 변화가 생길때마다 updateSelectValue함수를 통해 새로운 값을 selectedTelOption 변수에 저장해줌
  const updateSelectValue = (e) => {
    const selectedValue = e.target.value;
    console.log(selectedValue);
    setSelectedTelOption(selectedValue);
  };

  return (
    <Container_Modal>
      <Modal_Wrapper>
        <div>
          <Title>ID 찾기</Title>
        </div>
        <Input_Wrapper>
          <div className="findId-name-label">
            <label>이름</label>
          </div>
          <Input_Box>
            <Input_Style type="text" placeholder="이름을 입력하세요" />
          </Input_Box>
        </Input_Wrapper>
        <Input_Wrapper>
          <div className="findId-tel-label">
            <label>TEL</label>
          </div>
          <Phone_Box>
            <Select_Style
              value={selectedTelOption}
              onChange={updateSelectValue}
            >
              <option value="010">010</option>
              <option value="011">011</option>
              <option value="02">02</option>
              <option value="031">031</option>
            </Select_Style>
            <label>-</label>
            <Input_Box>
              <Input_Style type="text" placeholder="1234" />
            </Input_Box>
            <label>-</label>
            <Input_Box>
              <Input_Style type="text" placeholder="5678" />
            </Input_Box>
          </Phone_Box>
        </Input_Wrapper>
        <Button_Wrapper>
          <Button className={"findId"} btnTxt={"ID찾기"} />
          <Button className={"cancel"} btnTxt={"취소"} onClick={onBack} />
        </Button_Wrapper>
      </Modal_Wrapper>
    </Container_Modal>
  );
};

export default FindId;
