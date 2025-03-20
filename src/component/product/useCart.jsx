import axios from 'axios';
import { useEffect, useState } from 'react';

const CART_API_URL = 'http://localhost:/api/cart/';

export const useCart = () => {
   const [cartItems, setCartItems] = useState([]);
   const [tempOrderId, setTempOrderId] = useState(null);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);

   const fetchCart = async () => {
      setCartLoading(true);
      try {
         const token = localStorage.getItem('token');
         const res = await axios.get(`${CART_API_URL}/read`, {
            withCredentials: true,
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
         setCartItems(res.data.cart || []);
         setTempOrderId(res.data.tempOrderId);
      } catch (error) {
         console.error('cart load error', error);
         setError(error.response?.data?.message || error.message || "서버 오류가 발생했습니다");
      } finally {
         setCartLoading(false);
      }
   };

   const addCart = async (product_no, product_name, product_price, options) => {
      if (checkedProducts.length === 0) {
         alert('상품을 선택해주세요.');
         return;
      }
      try {
         setLoading(true);
         const res = await axios.post(`${CART_API_URL}/add`, {
            product_no: product_no,
            product_name: product.PRODUCT_NAME,
            product_price: product.PRODUCT_PRICE,
            options,
         }, {
            withCredentials: true
         });
         if (res.data.success) {
            setTempOrderId(res.data.tempOrderId);
            await fetchCart();
         }
      } catch (error) {
         console.error('add cart api error', error);
         setError(error.message);
      } finally {
         setLoading(false);
      }
   };

   const removeFromCart = async (productKey) => {
      setLoading(true);
      try {
         const token = localStorage.getItem('token');
         await axios.delete(`${CART_API_URL}/cart/remove`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
            data: { productKey },
         });
         await fetchCart();
      } catch (err) {
         setError(err.message);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchCart();
   }, [])

   return { cartItems, tempOrderId, loading, error, addToCart, removeFromCart, fetchCart };
};
