import { useCallback, useEffect,useState } from "react";
import { cartContext } from "./cartContext.jsx";
import fetchFromDb from "../utils/fetchFromDb";
import useAuth from "../hooks/useAuth";
const API_URL = import.meta.env.VITE_API_URL;

export const CartProvider = ({children}) => {
  const { user, loading: authLoading } = useAuth();
    const [cartloading, setLoading] = useState(false);
  const [carterror, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const addtocart = async(product, qty=1) => {
    console.log(product);
    setLoading(true)
    setError(null);
    try{
         await fetchFromDb(`${API_URL}/cart/create`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            productId: product.id,
            title: product.title,
            category: product.category,
            price: product.price,
            source: product.source,
            imageUrl: product.imageUrl || product.image,
          })
        });
         setCartItems(prev => {
          const exist = prev.find(i => i.productid === product.id);
          if(exist){
           return prev.map(i => {
            return i.productId === product.id ? {...i, qty: i.qty + qty }: i;
           })
          }
          return [...prev, {...product, qty}];

        });
    }catch(err){
        setError(err.message);
        throw err
    }finally{
        setLoading(false);
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

  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);


    return (
        <cartContext.Provider value={{cartloading, carterror, cartCount, getCartItems, addtocart, cartItems, removeCartItem}}>
        {children}
        </cartContext.Provider>
    );
   
}