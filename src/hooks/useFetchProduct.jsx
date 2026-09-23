import { useCallback, useState } from "react"
import fetchFromDb from "../utils/fetchFromDb";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

const useFetchproduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchproduct = useCallback(
        async () => {
            try{
                setLoading(true);
                const data = await fetchFromDb(`${API_URL}/product/get`, {
                    method: 'GET',
                    headers: {'Content-Type': "application/json"},
                });
                setProducts(data);
                if(data.length === 0){
                    toast('You have not created any products yet.');
                }
            }catch(err){
                toast.error(err.message);
                setProducts([]);
            }finally{
                setLoading(false);
            }
    }
, []);

const removeproduct = async (id) => {
    try{
        await fetchFromDb(`${API_URL}/product/delete/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })
            setProducts(prev => prev.filter(p => {
            return p.id !== id;
        }))
        toast.success('Product deleted')
}catch(err){
    toast.error(err.message);
}
}

const toggleFeaturedProduct = async (id) => {
    try{
        const response = await fetchFromDb(`${API_URL}/product/togglefeature/${id}`, {method: 'PUT', headers: {'Content-Type': 'application/json'}});
        setProducts(prev => prev.map(product => {
            if(product.id !== id){
                return product;
            }

            return {...product, isFeatured: response.updatedProduct.isFeatured};
        }));
        if(response.updatedProduct.isFeatured === true){
            toast.success('Product featured');
        }else{
            toast.success('Product unfeatured');
        }
    }catch(err){
        toast.error(err.message);
    }
}

return {fetchproduct, loading, products, removeproduct, toggleFeaturedProduct};
}

export default useFetchproduct;