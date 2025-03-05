import React from 'react';

const ProductsByCategory = () => {
   const [productsCat, setProductsCat] = useState([]);
   const imgPath = process.env.REACT_APP_IMG_PATH;

   const fetchProductsCat = async () => {
      try {
         const res = await axios.get('/api/products/category');
         setProductsCat(res.data);
      }
      catch (error) {
         console.log(error);
         setError(error);
      }
   }

   return (
      <div>
         <h1>ProductsByCategory</h1>
         <div>
            {productsCat.map((pCat) => {
               return (
                  <div key={pCat.product_no} onClick={() => navigate(`/product/${pCat.product_no}`)}>
                     <img src={`${imgPath}/${pCat.product_img}`} alt={pCat.product_name} />
                     <span>{pCat.product_name}</span>
                  </div>
               );
            })}
         </div>

      </div>
   )
}

export default ProductsByCategory;