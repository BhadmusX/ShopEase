import { Link } from "react-router";
import styles from '../emptyWishList/emptyWishList.module.css'
export function EmptyWish() {
    return(
        <div className={styles.container}>
            <h1 className={styles.text}>Nothing saved yet. Tap the heart on any product to add it here.</h1>
            <Link to='/shop' className={styles.shoppingBtn}>Continue Shopping</Link>
        </div>
    )
}