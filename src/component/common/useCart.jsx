// hooks/useCart.js
import axios from 'axios';
import { useEffect, useState } from 'react';

const API_BASE_URL = "http://localhost:8080/api";

export const useCart = () => {
   const [cartItems, setCartItems] = useState([]);
   const [tempOrderId, setTempOrderId] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

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

   return { cartItems, tempOrderId, loading, error, addToCart, removeFromCart, fetchCart };
};
