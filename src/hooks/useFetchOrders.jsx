import { useState, useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import fetchFromDb from "../utils/fetchFromDb";
import useAuth from "./useAuth";
const API_URL = import.meta.env.VITE_API_URL;
const useFetchOrders = (categories) => {

    const [adminOrders, setAdminOrders] = useState([]);
    const [adminLoading, setAdminLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("all");
    const [userOrders, setUserOrders] = useState([]);
    const [userLoading, setUserLoading] = useState(true);

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

    const updateOrderStatus = async(id, status) => {
        try{
            const response = await fetchFromDb(`${API_URL}/orders/update/${id}`, {method: "PUT", headers: {"Content-Type" : "application/json"}, body: JSON.stringify({status: status})});
            setAdminOrders(prev => prev.map(p => {
              return  p._id === id ? {...p, status: status} : p;
            }));
            console.log(adminOrders)
            toast.success("Status updated")
        }catch(err){
            toast.error(err.message);
        }
    };

    const fetchUserOrders = useCallback(
    async () => {
        try{
            setUserLoading(true);
            const response = await fetchFromDb(`${API_URL}/orders/user/get`, {method: "GET"});
            setUserOrders(response);
        }catch(err){
            toast.error(err.message);
        }finally{
            setUserLoading(false);
        }
    }, []);

    const categoryCount = useMemo(() => {
        const counts = {};
        categories.forEach(cat => {
            counts[cat] = cat === "all" ? userOrders.length : userOrders.filter(o => o.status === cat).length
        });
        return counts;
    }, [userOrders, categories]);

    const caategoryAdminCount = useMemo(() => {
        const counts = {};
        categories.forEach(cat => {
            counts[cat] = cat === "all" ? adminOrders.length : adminOrders.filter(o => o.status === cat).length
        });
        return counts;
    }, [adminOrders, categories]);

    const filteredOrders = useMemo(() => {
        return activeCategory === "all" ? adminOrders : adminOrders.filter(i => i.status === activeCategory);
    }, [activeCategory, adminOrders]);

    const filteredUsersOrders = useMemo(() => {
        return activeCategory === "all" ? userOrders : userOrders.filter(i => i.status === activeCategory);
    }, [activeCategory, userOrders]);

    return {adminLoading, adminOrders, fetchOrders, filteredOrders, activeCategory, setActiveCategory, updateOrderStatus, filteredUsersOrders, fetchUserOrders, categoryCount, caategoryAdminCount, setUserLoading};
}

export default useFetchOrders;