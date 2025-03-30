// SearchPage.jsx (새 컴포넌트)
const SearchPage = () => {
   const [keyword, setKeyword] = useState('');

   return (
      <>
         <Searchbox setKeyword={setKeyword} />
         <ProductLists keyword={keyword} />
      </>
   );
};
