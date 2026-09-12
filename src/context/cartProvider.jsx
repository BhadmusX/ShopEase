import { useEffect,useState } from "react";
import { cartContext } from "./cartContext";
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
        })
        await getCartItems();
    }catch(err){
        setError(err.message);
        throw err
    }finally{
        setLoading(false);
    }
  };

  const getCartItems = async () => {
    try{
    const response = await fetchFromDb(`${API_URL}/cart/get`);
    setCartItems(response);
    }catch(err){
        setError(err.message);
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);

  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);


    return (
        <cartContext.Provider value={{cartloading, carterror, cartCount, getCartItems, addtocart, cartItems}}>
        {children}
        </cartContext.Provider>
    );
   
}