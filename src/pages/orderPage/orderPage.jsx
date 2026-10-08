import { useEffect } from 'react';
import ProductFilter from '../../admin/component/productFilter/productFilter';
import { Footer } from '../../components/footer/footer';
import { Navbar } from '../../components/navbar/navbar';
import OrderCard from '../../components/orderCard/orderCard.jsx';
import useFetchOrders from '../../hooks/useFetchOrders';
import styles from '../orderPage/orderPage.module.css';
import { EmptyOrder } from '../../components/emptyOrder/emptyOrder.jsx';

const OrderPage = () => {
    const categories = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    const {
        setActiveCategory,
        activeCategory,
        filteredUsersOrders,
        fetchUserOrders,
        categoryCount,
        userLoading,
    } = useFetchOrders(categories);

    useEffect(() => {
        fetchUserOrders();
    }, [fetchUserOrders]);

    return (
        <div className={styles.appWrapper}>
            <Navbar />
            <div className={styles.container}>
                {filteredUsersOrders.length === 0 ? (
                    <EmptyOrder />
                ) : (
                    <>
                        <div className={styles.header}>
                            <div className={styles.topHeader}>
                                <h1>My Orders</h1>
                                <p>Track and review your past purchases</p>
                            </div>

                            <div className={styles.bottomHeader}>
                                <ProductFilter
                                    categories={categories}
                                    setActiveCategory={setActiveCategory}
                                    activeCategory={activeCategory}
                                    filteredOrders={filteredUsersOrders}
                                    count={categoryCount}
                                />
                            </div>
                        </div>

                        {userLoading ? (
                            <div className={styles.spinnerContainer}>
                                <div className={styles.spinner}></div>
                            </div>
                        ) : (
                            <div className={styles.orderContainer}>
                                {filteredUsersOrders.map((order, index) => (
                                    <OrderCard key={order.id ?? index} order={order} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default OrderPage;