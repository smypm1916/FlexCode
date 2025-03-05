import React from 'react';

// 메인페이지, 커뮤니티 사용예정
const onSearch = (value) => {
   console.log(value);
}

const Searchbox = ({ onSearch }) => {
   return (
      <div>
         {/* <!-- 검색창 --> */}
         <div class="search_wrapper">
            <div id="search_box">
               <h2>Search</h2>
               <div class="search_box_inner">
                  <input class="search_box_input" type="search" placeholder="검색어 입력" onChange={(e) => onSearch(e.target.value)} />
                  <button>검색</button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Searchbox;