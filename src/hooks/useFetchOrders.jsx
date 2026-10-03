import { useState, useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import fetchFromDb from "../utils/fetchFromDb";
import useAuth from "./useAuth";
const API_URL = import.meta.env.VITE_API_URL;
const useFetchOrders = () => {

    const [adminOrders, setAdminOrders] = useState([]);
    const [adminLoading, setAdminLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("all");

    const fetchOrders = useCallback(async() => {
        try{
            setAdminLoading(true);
        const response = await fetchFromDb(`${API_URL}/orders/get`, {method: "GET"});
        console.log(response);
        setAdminOrders(response);
        }catch(err){
            toast.error(err.message);
        }finally{
            setAdminLoading(false);
        }
    }, []);

    const filteredOrders = useMemo(() => {
        return activeCategory === "all" ? adminOrders : adminOrders.filter(i => i.status === activeCategory);
    }, [activeCategory, adminOrders]);

    return {adminLoading, adminOrders, fetchOrders, filteredOrders, activeCategory, setActiveCategory}
}

export default useFetchOrders;