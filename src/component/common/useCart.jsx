// hooks/useCart.js
import axios from 'axios';
import { useEffect, useState } from 'react';

const API_BASE_URL = "http://localhost:8080/api";

export const useCart = () => {
   const [cartItems, setCartItems] = useState([]);
   const [tempOrderId, setTempOrderId] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   // 장바구니 조회
   const fetchCart = async () => {
      setLoading(true);
      try {
         const token = localStorage.getItem('token');
         const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

         const res = await axios.get(`${API_BASE_URL}/cart/read/${tempOrderId}`, {
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

   // 장바구니 추가
   const addToCart = async (product_no, product_name, product_price, options) => {
      setLoading(true);
      try {
         const token = localStorage.getItem('token');
         const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

         const res = await axios.post(`${API_BASE_URL}/cart/add`, {
            product_no,
            product_name,
            product_price,
            options,
         }, { withCredentials: true, ...config });

         if (res.data.success) {
            setTempOrderId(res.data.tempOrderId);
            await fetchCart();
         }
      } catch (err) {
         setError(err.response?.data?.message || err.message);
      } finally {
         setLoading(false);
      }
   };

   // 장바구니 상품 수량변경
   const updateCartQuantity = async (product_no, new_quantity) => {
      setLoading(true);
      try {
         const token = localStorage.getItem('token');
         const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
         const res = await axios.put(`${API_BASE_URL}/cart/update`, {
            product_no,
            new_quantity
         }, {
            withCredentials: true,
            ...config
         });
         if (res.data.success) {
            // 성공 후 장바구니 재조회
            await fetchCart();
         }
      }
      catch (err) {
         setError(err.response?.data?.message || err.message);
      } finally {
         setLoading(false);
      }
   };

   // 장바구니에서 제거
   const removeFromCart = async (productKey) => {
      setLoading(true);
      try {
         const token = localStorage.getItem('token');
         const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

         await axios.delete(`${API_BASE_URL}/cart/remove`, {
            withCredentials: true,
            ...config,
            data: { productKey },
         });

         setCartItems(prev => prev.filter(products => {
            const pk = `product:${products.PRODUCT_NO}:option:${products.OPTION_NO}`;
            return pk !== productKey;
         }));

         await fetchCart();
      } catch (err) {
         setError(err.response?.data?.message || err.message);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchCart();
   }, []);

   useEffect(() => {
      console.log("현재 tempOrderId 값:", tempOrderId);
   }, [tempOrderId]);

   return { cartItems, tempOrderId, loading, error, addToCart, removeFromCart, fetchCart, updateCartQuantity };
};
