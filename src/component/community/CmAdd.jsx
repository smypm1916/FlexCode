const CmAdd = () => {
  return (
    <div className="CmAddContainer">
      <div>프로필사진</div>
      <div className="CmAddTitle">
        <div>
          <label>제목</label>
        </div>
        <div className="CmInputTitle">
          <input type="text" placeholder="제목을 입력하세요" />
        </div>
      </div>

      <div className="CmAddDescription">
        <div>
          <label>내용</label>
        </div>
        <div className="CmInputDescription">
          <input type="text" placeholder="내용을 입력하세요" />
        </div>
      </div>
      <div className="CmInputFlie">
        <label>사진 등록</label>
        <input type="file" />
      </div>
      <div className="CmBddBtn">
        <button>글쓰기</button>
        <button>뒤로가기</button>
      </div>
    </div>
  );
};
export default CmAdd;
