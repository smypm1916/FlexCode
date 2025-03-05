const CmDetail = () => {
  return (
    <div className="cm-detail-container">
      <div className="cm-detail-top">
        <div>유저프로필</div>
        <div>
          <label>제목</label>
        </div>
        <div className="cm-title"></div>
      </div>

      <div className="cm-detail-mid">
        <div>
          <label>내용</label>
        </div>
        <div>
          <div>글내용</div>
          <div>이미지</div>
        </div>
      </div>
      <div className="cm-detail-bottom">
        <div>
          <label>작성일</label>
        </div>
        <div>25/03/05</div>
      </div>
      <div>
        <button>수정하기</button>
        <button>삭제하기</button>
      </div>
    </div>
  );
};
export default CmDetail;
