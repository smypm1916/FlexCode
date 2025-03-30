import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 페이지가 라우팅될때마다(경로가 바뀔때마다) 스크롤을 맨 위로 이동시켜줌.
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default ScrollToTop;
