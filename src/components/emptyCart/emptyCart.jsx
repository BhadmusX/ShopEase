import { Link } from "react-router";
import {MoveRight, ShoppingCart} from "lucide-react";
import styles from '../emptyCart/emptyCart.module.css';
export function EmptyCart() {
    return(
        <div className={styles.container}>

        <div className={styles.messageContainer}>
            <div className={styles.iconContainer}><ShoppingCart size={25} color="#005236"/></div>
            <h1 className={styles.text}>Your cart is empty</h1>
<p>Items you add will show up here, ready for checkout.</p>
            <Link to='/shop' className={styles.shoppingBtn}>Start Shopping <MoveRight size={20}/></Link>
        </div>

        </div>
    )
}