import { useCallback, useState } from "react"
import fetchFromDb from "../utils/fetchFromDb";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

const useFetchAnalytics = () => {
    const [totalSale, setTotalSale]  = useState('');
    const [totalRev, setTotalRev]  = useState('');
    const [totalUsers, setTotalUsers]  = useState('');
    const [totalProducts, setTotalProducts]  = useState('');
    const [loading, setLoading] = useState(true);

    const fetchAnalytics = useCallback(async () => {
        try{
            setLoading(true);
            const response = await fetchFromDb(`${API_URL}/analytics/get`, {method: 'GET'});
            setTotalProducts(response.totalProducts);
            setTotalRev(response.totalRevenue);
            setTotalUsers(response.totalUser);
            setTotalSale(response.totalSales);
        }catch(err){
            toast.error(err.message);
        }finally{
            setLoading(false);
        }
    }, []);

    return {fetchAnalytics, totalProducts, totalSale, totalRev, totalUsers, loading};



}

export default useFetchAnalytics;