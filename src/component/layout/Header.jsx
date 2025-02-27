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
               <h3>Header</h3>
            </div>
         </div>
      </>
   )
}

export default Header