import styles from '../orderCard/orderCard.module.css';
import formatCurrency from '../../../utils/formatCurrency';
const OrderCard = ({order, status, updateOrderStatus}) => {
    const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
    return(
        <div className={styles.orderContainer}>
            <div className={styles.topCardContainer}>
                <div className={styles.topCard}>
                    <p>Order</p>
                    <h1>{order.orderId}</h1>
                </div>

                <div className={styles.topCard}>
                    <p>Customer</p>
                    <h1>{order.name}</h1>
                </div>

                <div className={styles.topCard}>
                    <p>Date</p>
                    <h1>{orderDate}</h1>
                </div>
            </div>

            <div className={styles.bottomCardContainer}>
                <div className={styles.bottomCard}>
                    <p>Items</p>
                    <h1>{order.products.length}</h1>
                </div>

                <div className={styles.bottomCard}>
                    <p>Total</p>
                    <h1>{formatCurrency(order.totalAmount)}</h1>
                </div>

                <div className={styles.bottomCard}>
                    <p>Status</p>
                    <select 
                    name="status" 
                    id="status" 
                    className={`${styles[order.status]} ${styles.status}`}
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}>
                        {status.map(s => {
                            return <option value={s} key={s}>{s}</option>
                        })}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default OrderCard;