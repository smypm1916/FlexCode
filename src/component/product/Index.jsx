import React from 'react';
import Searchbox from '../common/Searchbox';
import Category from './Category';
import EventBanner from './EventBanner';
import Pick from './Pick';
import ProductLists from './ProductLists';

// 상품 상태 관리
// const [products, setProducts] = useState([

// ]);


const Index = () => {
   const onsearch = (value) => {
      console.log(value);
   }
   return (
      <>
         <EventBanner />
         <Searchbox onsearch={onsearch} />
         <Category />
         <Pick />
         <ProductLists />
      </>
   )
}

export default Index;