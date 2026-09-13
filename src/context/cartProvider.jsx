import { useCallback, useEffect,useState } from "react";
import { cartContext } from "./cartContext.jsx";
import fetchFromDb from "../utils/fetchFromDb";
const API_URL = import.meta.env.VITE_API_URL;

export const CartProvider = ({children}) => {
    const [cartloading, setLoading] = useState(false);
  const [carterror, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const addtocart = async(productId, qty=1) => {
    setLoading(true)
    setError(null);
    try{
         await fetchFromDb(`${API_URL}/cart/create`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({productId:productId, qty:qty})
        });
         setCartItems(prev => {
          const exist = prev.find(i => i.productId._id === productId);
          if(exist){
           return prev.map(i => {
            return i.productId._id === productId ? {...i, qty: i.qty + qty }: i;
           })
          }
          return [...prev, {productId, qty}];

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
    }catch(err){
        setError(err.message);
    }
  }, [])

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);


    return (
        <cartContext.Provider value={{cartloading, carterror, cartCount, getCartItems, addtocart, cartItems}}>
        {children}
        </cartContext.Provider>
    );
   
}