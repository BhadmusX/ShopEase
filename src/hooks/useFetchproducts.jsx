import { useCallback, useState } from "react";
import fetchFromDb from "../utils/fetchFromDb";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;
const useFetchProducts = () => {
     const [productData, setData] = useState([]);
    const [productError, setError] = useState(null);
    const [productLoading, setLoading] = useState(true);
    const [featuredProduct, setfeaturedProduct] = useState([]);
    const [featuredProductLoading, setFeaturedProductLoading] = useState(true);


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

    const getFeaturedProducts = useCallback(async() => {
        try{
            setFeaturedProductLoading(true);
            const response = await fetchFromDb(`${API_URL}/product/get/featured`, {method: 'GET'});
            setfeaturedProduct(response);
        }catch(err){
            toast.error(err.message);
        }finally{
            setFeaturedProductLoading(false);
        }
    }, []);

    return {fetchProduct, productError, productData, productLoading, featuredProduct, featuredProductLoading, getFeaturedProducts}
}

export default useFetchProducts;