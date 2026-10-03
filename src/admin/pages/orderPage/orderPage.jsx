import { useEffect } from "react";
import useFetchOrders from "../../../hooks/useFetchOrders"
import styles from '../orderPage/orderPage.module.css';
import OrderCard from "../../component/orderCard/orderCard";
import ProductFilter from "../../component/productFilter/productFilter";
const AdminOrderPage = () => {
    const {adminLoading, fetchOrders, filteredOrders, setActiveCategory, activeCategory} = useFetchOrders();

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const categories = ["all", "pending", "shipped", "delivered", "cancelled"];

    return(
        <>
        <div className={styles.header}>
            <div className={styles.topHeader}>
               <div className={styles.headerInfo}>
                  <h1>Orders</h1>
                  <p>{filteredOrders.length} products</p>
                 </div>
            </div> 

              <div>
                <ProductFilter categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>
              </div>
        </div>

        {adminLoading ? <div className={styles.spinnerContainer}><div className={styles.spinner}></div></div> : <div>
            {filteredOrders.map(order => <OrderCard key={order.orderId} order={order}/>)}
            </div>}
        </>
        
    )
}

export default AdminOrderPage;