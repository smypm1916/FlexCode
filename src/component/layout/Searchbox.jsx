import React from 'react';

const Searchbox = () => {
   return (
      <div>
         {/* <!-- 검색창 --> */}
         <div class="search_wrapper">
            <div id="search_box">
               <div class="search_box_inner">
                  <input class="search_box_input" type="search" placeholder="검색어 입력" />
                  <button>검색</button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Searchbox;