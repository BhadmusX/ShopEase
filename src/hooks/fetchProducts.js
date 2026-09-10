import { useEffect, useState } from "react";
import fetchProducts from "../utils/fetchproduct";

const useFetchProducts = () => {
const [loading, setLoading] = useState(true);
const [products, setProducts] = useState(null);
const [error, setError] = useState(null);

useEffect(()=> {
    const controller = new AbortController();
    const fetchProduct = async() => {
        setLoading(true);
        try{
       const response = await fetchProducts("https://fakestoreapi.com/products", controller.signal );
       setProducts(response);
       setError(null);
        }catch(error){
            if(controller.signal.aborted) {
                console.log("Aborted");
            return;
            }
            
            setError(error);
            setProducts(null);
        }finally{
            if(!controller.signal.aborted)
            setLoading(false);
        }
    }

    fetchProduct();

    return () => controller.abort();
}, [])

return [loading, error, products]
}

export default useFetchProducts;