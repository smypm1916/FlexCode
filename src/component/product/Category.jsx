import React from 'react';
import ProductsByCategory from './ProductsByCategory';

const Category = () => {
   const [category, setCategory] = useState([]);

   useEffect(() => {
      const fetchCategory = async () => {
         const response = await axios.get("/api/products/category");
         setCategory(response.data);
      }
   }, []);
   return (
      <div>
         <h1>Category</h1>
         <div>
            <div onClick={()}>
               <span>cat1</span>
               <img src="" alt="" />
            </div>
            <div onClick={()}>
               <span>cat2</span>
               <img src="" alt="" />
            </div>
            <div onClick={()}>
               <span>cat3</span>
               <img src="" alt="" />
            </div>
            <div onClick={()}>
               <span>cat4</span>
               <img src="" alt="" />
            </div>
            <div onClick={()}>
               <span>cat5</span>
               <img src="" alt="" />
            </div>
            <div onClick={()}>
               <span>cat6</span>
               <img src="" alt="" />
            </div>
            <ProductsByCategory />
         </div>
      </div>
   )
}

export default Category;