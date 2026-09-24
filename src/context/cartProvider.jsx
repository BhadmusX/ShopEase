import { useCallback, useEffect,useState } from "react";
import { cartContext } from "./cartContext.jsx";
import fetchFromDb from "../utils/fetchFromDb";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";
const API_URL = import.meta.env.VITE_API_URL;

export const CartProvider = ({children}) => {
  const { user, loading: authLoading } = useAuth();
    const [loadingProductId, setLoadingProductId] = useState(null);
  const [carterror, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const addtocart = async(product, qty=1) => {
    console.log(product);
    if (authLoading) {
      return false;
    }
    if(!user){
      navigate('/signin');
      return false;
    }
    const productId = String(product.id ?? product.productId ?? product._id);
    setLoadingProductId(productId);
    setError(null);
    try{
         await fetchFromDb(`${API_URL}/cart/create`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            productId,
            title: product.title,
            category: product.category,
            price: product.price,
            source: product.source,
            imageUrl: product.imageUrl || product.image,
          })
        });
         setCartItems(prev => {
          const exist = prev.find(i => String(i.productId) === productId);
          if(exist){
           return prev.map(i => {
            return String(i.productId) === productId ? {...i, qty: i.qty + qty }: i;
           })
          }
          return [...prev, {...product, qty}];

        });
          return true;
    }catch(err){
        setError(err.message);
        throw err
    }finally{
      setLoadingProductId(null);
    }
  };

  const getCartItems = useCallback(async () => {
    try{
    const response = await fetchFromDb(`${API_URL}/cart/get`);
    setCartItems(response);
    console.log(cartItems);
    console.log(response);
    }catch(err){
        setError(err.message);
    }
  }, []);

  const removeCartItem = async (cartId) => {
    try{
      await fetchFromDb(`${API_URL}/cart/delete/${cartId}` ,{method: "DELETE"});
      setCartItems(prev => prev.filter(i => i._id !== cartId ));
    }catch(err){
      throw err;
    }
  }

  useEffect(() => {
    if (authLoading || !user) {
      return;
    }
    getCartItems();
  }, [authLoading, getCartItems, user]);

  const checkOut = async () => {
    const session = await fetchFromDb(`${API_URL}/payment/checkoutsession`, {
      method: 'POST', 
      body: JSON.stringify({products: cartItems}),
      headers: {'Content-Type': "application/json"}
    });
    window.location.href = session.url;
  }

  const clearCart = async () => {
    try{
    await fetchFromDb(`${API_URL}/cart/delete`, {
      method: 'DELETE',
      headers: {'Content-Type' : "appplication/json"}
    });
    setCartItems([]);
  }catch(err){
    throw err
  }
  }

  const updateCartQuantity = async (qty, id) => {
    try{
      await fetchFromDb(`${API_URL}/cart/update/${id}`, {
        method:'PUT',
        headers: {'Content-Type':"application/json"},
        body: JSON.stringify({qty: qty})
      });

      setCartItems(prev => prev.map(i => {
        console.log(i)
        return i._id === id ? {...i, qty: qty} : i      }))
    }catch(err){
      throw err
    }
  };



  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);


    return (
        <cartContext.Provider value={{loadingProductId, carterror, cartCount, getCartItems, addtocart, cartItems, removeCartItem, checkOut, clearCart, updateCartQuantity}}>
        {children}
        </cartContext.Provider>
    );
   
}