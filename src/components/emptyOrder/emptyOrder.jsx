import { Link } from "react-router";
import {ShoppingBag, MoveRight,} from "lucide-react";
import styles from '../emptyOrder/emptyOrder.module.css';
export function EmptyOrder() {
    return(
        <div className={styles.container}>

        <div className={styles.messageContainer}>
            <div className={styles.iconContainer}><ShoppingBag size={25} color="#005236"/></div>
            <h1 className={styles.text}>No orders yet</h1>
            <p>When you place an order, you can track delivery and view here purchase history right here.</p>
            <Link to='/shop' className={styles.shoppingBtn}>Start Shopping <MoveRight size={20}/></Link>
        </div>

        </div>
    )
}