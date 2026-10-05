import formatCurrency from '../../utils/formatCurrency';
import styles from '../orderCard/orderCard.module.css';
import { ArrowRight } from 'lucide-react';
const OrderCard = ({order}) => {
    const formattedOrderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

    return(
        <div className={styles.orderCard}>

            <div className={styles.topCard}>
                <div className={styles.orderDetails}>
                    <h1>{order.orderId}</h1>
                    <p>{formattedOrderDate}</p>
                </div>

                <div className={`${styles.orderStatus} ${styles[order.status]}`}>
                    <span className={styles.pulse}></span> <p>{order.status}</p>
                </div>
            </div>

            <div className={styles.middleCard}>
                <div ><img className={styles.productImage} src={order.products[0].imageUrl} alt="Product image" /></div>

                <div className={styles.orderDetails}>
                    <h1>{order.products[0].title}</h1>
                    <div><p>{order.products.length} items</p></div>
                </div>
            </div>

            <div className={styles.bottomCard}>
                <div className={styles.orderTotal}>
                    <p>Total</p>
                    <h1>{formatCurrency(order.totalAmount)}</h1>
                </div>

                <button>View details <ArrowRight size={15}/></button>
            </div>
        </div>
    )
}

export default OrderCard;