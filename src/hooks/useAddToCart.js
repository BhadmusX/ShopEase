import { useState } from "react";
import addToCart from "../utils/addToCart";
const useAddToCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const addtocart = async(productId, qty=1) => {
    setLoading(true)
    setError(null);
    try{
        const result = await addToCart(productId, qty);
        setData(result);
        return result;
    }catch(err){
        setError(err.message);
        throw err
    }finally{
        setLoading(false);
    }
  };

  return {addtocart, loading, error, data};
};

export default useAddToCart;