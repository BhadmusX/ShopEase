import { useEffect } from 'react';
import ProductFilter from '../../admin/component/productFilter/productFilter';
import { Footer } from '../../components/footer/footer';
import { Navbar } from '../../components/navbar/navbar';
import OrderCard from '../../components/orderCard/orderCard.jsx';
import useFetchOrders from '../../hooks/useFetchOrders';
import styles from '../orderPage/orderPage.module.css';
const OrderPage = () => {
    const categories = ["all", "pending", "processing", "shipped", "delivered", "cancelled"];
    const {setActiveCategory, activeCategory, filteredUsersOrders, fetchUserOrders, categoryCount, userLoading} = useFetchOrders(categories);

    useEffect(() => {
        fetchUserOrders();
    }, [fetchUserOrders]);

    console.log(filteredUsersOrders)

    return (
        <div className={styles.appWrapper}>
            <Navbar/>
            <div className={styles.container}>

                <div className={styles.header}>
                    <div className={styles.topHeader}>
                        <h1>My Orders</h1>
                        <p>Track and review your past purchases</p>
                    </div>

                    <div className={styles.bottomHeader}>
                        <ProductFilter categories={categories} setActiveCategory={setActiveCategory} activeCategory={activeCategory} filteredOrders={filteredUsersOrders} count={categoryCount}/>
                    </div>
                </div> 


                {
                    userLoading ? <div className={styles.spinnerContainer}><div className={styles.spinner}></div></div>:  <div className={styles.orderContainer}>
                    {filteredUsersOrders.map(order => <OrderCard order={order}/>)}
                </div>
                }
               
            </div>
            <Footer/>
        </div>
    )
}
export default OrderPage;