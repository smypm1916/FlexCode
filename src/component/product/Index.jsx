import React from 'react';
import Searchbox from '../layout/searchbox';
import Category from './Category';
import EventBanner from './EventBanner';
import Pick from './Pick';
import Shopping from './Shopping';

const Index = () => {
   return (
      <>
         <EventBanner />
         <Searchbox />
         <Category />
         <Pick />
         <Shopping />
      </>
   )
}

export default Index;