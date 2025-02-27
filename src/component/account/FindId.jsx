import { useState } from "react";

const FindId = () => {
  const style = {
    display: "flex",
  };

  // 현재 선택된 select option이 가지고 있는 value값을 저장할 상태관리변수
  const [selectedTelOption, setSelectedTelOption] = useState("010");

  // select 태그에서 변화가 생길때마다 updateSelectValue함수를 통해 새로운 값을 selectedTelOption 변수에 저장해줌
  const updateSelectValue = (e) => {
    const selectedValue = e.target.value;
    console.log(selectedValue);
    setSelectedTelOption(selectedValue);
  };

  return (
    <div className="findIdPage">
      <div className="findId-title">
        <h2>ID 찾기</h2>
      </div>
      <div className="findId-name" style={style}>
        <div className="findId-name-label">
          <label>이름</label>
        </div>
        <div className="findId-name-input">
          <input type="text" placeholder="이름을 입력하세요" />
        </div>
      </div>
      <div className="findId-tel" style={style}>
        <div className="findId-tel-label">
          <label>TEL</label>
        </div>
        <div className="findId-tel-select">
          <select value={selectedTelOption} onChange={updateSelectValue}>
            <option value="010">010</option>
            <option value="011">011</option>
            <option value="02">02</option>
            <option value="031">031</option>
          </select>
        </div>
        <div className="findId-tel-middle">
          <input type="text" placeholder="1234" />
        </div>
        <div className="findId-tel-last">
          <input type="text" placeholder="5678" />
        </div>
      </div>
      <div className="findId-btns" style={style}>
        <button>ID 찾기</button>
        <button>취소</button>
      </div>
    </div>
  );
};

export default FindId;
