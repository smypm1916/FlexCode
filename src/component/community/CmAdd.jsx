const CmAdd = () => {
  return (
    <div className="cm-add-container">
      <div>프로필사진</div>
      <div className="cm-add-title">
        <div>
          <label>제목</label>
        </div>
        <div className="cm-input-title">
          <input type="text" placeholder="제목을 입력하세요" />
        </div>
      </div>

      <div className="cm-add-description">
        <div>
          <label>내용</label>
        </div>
        <div className="cm-input-description">
          <input type="text" placeholder="내용을 입력하세요" />
        </div>
      </div>
      <div>
        <button>글쓰기</button>
        <button>삭제하기</button>
      </div>
    </div>
  );
};
export default CmAdd;
