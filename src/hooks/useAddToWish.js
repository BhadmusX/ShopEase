import fetchFromDb from "../utils/fetchFromDb";
import { useState } from "react";
const useAddToWish = () => {
     const [wishloading, setLoading] = useState(false);
      const [wisherror, setError] = useState(null);
      const [wishdata, setData] = useState(null);

      const addToWish = async (productId) => {
        setLoading(true);
        setError(null);
        try{
            const response = await fetchFromDb('http://localhost:5000/favorite/create', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({productId: productId})
            });
            setData(response);
            return setError(null);
        }catch(err){
            setError(err);
            setData(null);
        }finally{
            setLoading(false);
        }
      };

      return {addToWish, wishloading, wishdata, wisherror}
}

export default useAddToWish;