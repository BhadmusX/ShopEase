import { Link } from "react-router";
import {Heart, MoveRight,} from "lucide-react";
import styles from '../emptyWishList/emptyWishList.module.css';
export function EmptyWish() {
    return(
        <div className={styles.container}>

        <div className={styles.messageContainer}>
            <div className={styles.iconContainer}><Heart size={25} color="#005236" /></div>
            <h1 className={styles.text}>Your wishlist is empty</h1>
            <p>Tap the heart on any product to save it here for later.</p>
            <Link to='/shop' className={styles.shoppingBtn}>Start Shopping <MoveRight size={20}/></Link>
        </div>

        </div>
    )
}