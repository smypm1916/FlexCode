const CmDetail = () => {
  return (
    <div className="CmDetailContainer">
      <div className="CmDetailTop">
        <div>유저프로필</div>
        <div>
          <label>제목</label>
        </div>
        <div className="CmTitle">제목입니다</div>
      </div>

      <div className="CmDetailMid">
        <div>
          <label>내용</label>
        </div>
        <div className="CmContent">
          <div>글내용입니다</div>
          <div>이미지입니다</div>
        </div>
      </div>
      <div className="CmDetailBottom">
        <div>
          <label>작성일</label>
        </div>
        <div>25/03/05</div>
      </div>
      <div className="CmDetailBtn">
        <button>수정하기</button>
        <button>삭제하기</button>
      </div>
    </div>
  );
};
export default CmDetail;
