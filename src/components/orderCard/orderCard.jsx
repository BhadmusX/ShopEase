import styles from '../orderCard/orderCard.module.css';
const OrderCard = ({order}) => {
    const formattedOrderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

    return(
        <div>

            <div className={styles.topcard}>
                <div>
                    <h1>{order.orderId}</h1>
                    <p>{formattedOrderDate}</p>
                </div>

                <div>
                    <span className={styles.pulse}></span> <p>{order.status}</p>
                </div>
            </div>

            <div>
                <div><img src={order.products[0].imageUrl} alt="Product image" /></div>

                <div>
                    <h1>{order.products[0].title}</h1>
                    <div><p>{order.products.length} items</p></div>
                </div>
            </div>

            <div>
                <div>
                    <p>Total</p>
                    <p>${order.totalAmount}</p>
                </div>

                <button>View details</button>
            </div>
        </div>
    )
}

export default OrderCard;