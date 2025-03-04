import React from 'react'

const Footer = () => {
   const footerStyle = {
      backgroundColor: "lightgray",
      border: "1px solid blue",
      width: "100%",

   }
   return (
      <>
         <div className="footer" style={footerStyle}>
            <div className="footer-content" >
               <h3>Footer</h3>
            </div>
         </div>
      </>
   )
}

export default Footer