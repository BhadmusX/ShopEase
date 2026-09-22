import { useCallback, useState } from "react";
import fetchFromDb from "../utils/fetchFromDb";
const API_URL = import.meta.env.VITE_API_URL;
const useFetchProducts = () => {
     const [productData, setData] = useState([]);
    const [productError, setError] = useState(null);
    const [productLoading, setLoading] = useState(true);

    const fetchProduct = useCallback(async() => {
        setLoading(true);
        setError(null);
        try{
             const response = await fetchFromDb(`${API_URL}/product/combined/get`);;
        setData(response);
        return;
        }catch(err){
            setError(err.message || 'Something went wrong');
        }finally{
            setLoading(false);
        }
    }, []);

    return {fetchProduct, productError, productData, productLoading}
}

export default useFetchProducts;