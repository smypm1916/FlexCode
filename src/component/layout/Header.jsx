import React from 'react'


const Header = () => {
   const headerStyle = {
      "backgroundColor": "lightgray",
      "border": "1px solid blue",
      "width": "100%",
   }
   return (
      <>
         <div className="header" style={headerStyle}>
            <div className="header-content">
               <ul className="header-logo">
                  <li>
                     <img src={logo} alt="logo" />
                  </li>
                  <li><a href="">HOME</a></li>
                  <li><a href="">SHOP</a></li>
                  <li><button>로그인</button></li>
                  <li><button>장바니</button></li>
               </ul>

            </div>
         </div>
      </>
   )
}

export default Header