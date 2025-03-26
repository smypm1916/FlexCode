// hooks/useCart.js
import axios from 'axios';
import { useEffect, useState } from 'react';

const API_BASE_URL = "http://localhost:8080/api";

export const useCart = () => {
   const [cartItems, setCartItems] = useState([]);
   const [tempOrderId, setTempOrderId] = useState(sessionStorage.getItem("tempOrderId"));
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   // 장바구니 조회
   const fetchCart = async () => {
      setLoading(true);
      try {
         const token = localStorage.getItem('token');
         const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

         const res = await axios.get(`${API_BASE_URL}/cart/read`, {
            withCredentials: true,
            ...config
         });

         setCartItems(res.data.products || []);
         setTempOrderId(res.data.tempOrderId || null);
      } catch (err) {
         setError(err.response?.data?.message || err.message);
      } finally {
         setLoading(false);
      }
   };

   // const fetchCart = useCallback(async (forceTempOrderId = null) => {
   //    setLoading(true);
   //    try {
   //       const targetOrderId = forceTempOrderId || sessionStorage.getItem("tempOrderId");
   //       const token = localStorage.getItem('token');
   //       const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

   //       const res = await axios.get(`${API_BASE_URL}/cart/read/${targetOrderId}`, {
   //          withCredentials: true,
   //          ...config
   //       });

   //       if (res.data.success) {
   //          setCartItems(res.data.products || []);
   //          // tempOrderId 업데이트 통합
   //          if (res.data.tempOrderId) {
   //             sessionStorage.setItem("tempOrderId", res.data.tempOrderId);
   //             setTempOrderId(res.data.tempOrderId);
   //          }
   //       }
   //       // return res.data;
   //    } catch (err) {
   //       setError(err.response?.data?.message || err.message);
   //       throw err;
   //    } finally {
   //       setLoading(false);
   //    }
   // });

   // refreshCart를 더 간결하게 수정
   const refreshCart = async (newTempOrderId) => {
      try {
         await fetchCart(newTempOrderId);
      } catch (error) {
         console.error('장바구니 새로고침 실패', error);
      }
   };

   // 장바구니 추가
   const addToCart = async (product_no, product_name, product_price, options) => {
      const normalized = options.map(opt => ({
         option_no: opt.OPTION_NO,
         option_title: opt.OPTION_TITLE,
         option_price: opt.OPTION_PRICE,
         quantity: opt.quantity
      }));

      setLoading(true);
      try {
         const token = localStorage.getItem('token');
         const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

         const res = await axios.post(`${API_BASE_URL}/cart/add`, {
            product_no,
            product_name,
            product_price,
            options: normalized,
            tempOrderId,
         }, { withCredentials: true, ...config });

         if (res.data.success && res.data.tempOrderId) {
            setTempOrderId(res.data.tempOrderId);
            sessionStorage.setItem("tempOrderId", res.data.tempOrderId);
         }

         await fetchCart(res.data.tempOrderId);
         return res.data.tempOrderId;
      } catch (err) {
         setError(err.response?.data?.message || err.message);
      } finally {
         setLoading(false);
      }
   };

   // 장바구니 상품 수량 변경
   const updateCartQuantity = async (product_no, new_quantity) => {
      setLoading(true);
      try {
         const token = localStorage.getItem('token');
         const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

         await axios.put(`${API_BASE_URL}/cart/update`, {
            product_no,
            new_quantity
         }, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true, ...config });

         await fetchCart();
      }
      catch (err) {
         setError(err.response?.data?.message || err.message);
      } finally {
         setLoading(false);
      }
   };

   // 장바구니 상품 삭제
   const removeFromCart = async (productKey) => {
      setLoading(true);
      try {
         const token = localStorage.getItem('token');
         const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

         await axios.delete(`${API_BASE_URL}/cart/remove`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
            ...config,
            data: { productKey },
         });

         await fetchCart();
      } catch (err) {
         setError(err.response?.data?.message || err.message);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      if (tempOrderId) {
         sessionStorage.setItem('tempOrderId', tempOrderId);
      }
   }, [tempOrderId]);

   return { cartItems, addToCart, updateCartQuantity, removeFromCart, fetchCart, refreshCart, tempOrderId, loading, error };
};
