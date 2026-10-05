import { useEffect } from "react";
import useFetchOrders from "../../../hooks/useFetchOrders"
import styles from '../orderPage/orderPage.module.css';
import OrderCard from "../../component/orderCard/orderCard";
import ProductFilter from "../../component/productFilter/productFilter";
const AdminOrderPage = () => {
    const categories = ["all", "pending", "processing", "shipped", "delivered", "cancelled"];
    const {adminLoading, fetchOrders, filteredOrders, setActiveCategory, activeCategory, updateOrderStatus, caategoryAdminCount} = useFetchOrders(categories);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    
    const status = ["pending", "processing", "shipped", "delivered", "cancelled"];
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
                <ProductFilter categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} filteredOrders={filteredOrders} count={caategoryAdminCount}/>
              </div>
        </div>

        {adminLoading ? <div className={styles.spinnerContainer}><div className={styles.spinner}></div></div> : <div>
            {filteredOrders.map(order => <OrderCard key={order.orderId} order={order} status={status} updateOrderStatus={updateOrderStatus}/>)}
            </div>}
        </>
        
    )
}

export default AdminOrderPage;