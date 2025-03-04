import React from 'react';

const Searchbox = ({ onsearch }) => {
   return (
      <div>
         {/* <!-- 검색창 --> */}
         <div class="search_wrapper">
            <div id="search_box">
               <h2>Search</h2>
               <div class="search_box_inner">
                  <input class="search_box_input" type="search" placeholder="검색어 입력" onChange={(e) => onsearch(e.target.value)} />
                  <button>검색</button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Searchbox;