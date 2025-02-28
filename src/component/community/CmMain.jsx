const CmMain = () => {
  return (
    <div className="cm-container">
      <div className="cm-top-ad">{cmTopAd}</div>

      <div className="cm-search">
        <div className="search-select"></div>
        <div className="search-input">
          <input type="text" placeholder="search" />
        </div>
        <button onClick={cmSearchBtn}>SEARCH</button>
      </div>

      <div className="cm-info">상품 리뷰</div>

      <div className="cm-write">
        <div>유저프로필{userProfile}</div>
        <div>제목{cmTilte}</div>
        <div>이미지{cmImg}</div>
        <div>작성자{userName}님</div>
        <div>날짜{cmDate}</div>
      </div>
      <div>
        <button onClick={cmWrite}>글쓰기</button>
      </div>
      <div>페이징{CmPaging}</div>
    </div>
  );
};
export default CmMain;
