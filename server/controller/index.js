import React, { useEffect, useState } from "react";

const Index = () => {
   const PORT = process.env.PORT || 3000;
   const [products, setProducts] = useState([]);

   useEffect(() => {
      fetch(`http://localhost:${PORT}/api/products`)
         .then((res) => res.json())
         .then((data) => setProducts(data))
         .catch((err) => console.error(err));
   }, []);

   return (
      <div>
         <h2>상품 목록</h2>
         <ul>
            {products.map((product) => (
               <li key={product.id}>
                  {product.name} - {product.price}원
               </li>
            ))}
         </ul>
      </div>
   );
};

export default Index;
