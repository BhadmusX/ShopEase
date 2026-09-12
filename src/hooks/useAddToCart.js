import { useState } from "react";
import fetchFromDb from "../utils/fetchFromDb";
const useAddToCart = () => {
  const [cartloading, setLoading] = useState(false);
  const [carterror, setError] = useState(null);

  const addtocart = async(productId, qty=1) => {
    setLoading(true)
    setError(null);
    try{
         await fetchFromDb('http://localhost:5000/cart/create', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({productId:productId, qty:qty})
        })
    }catch(err){
        setError(err.message);
        throw err
    }finally{
        setLoading(false);
    }
  };

  return {addtocart, cartloading, carterror};
};

export default useAddToCart;