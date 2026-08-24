import { Link } from "react-router";
import styles from '../emptyCart/emptyCart.module.css'
export function EmptyCart() {
    return(
        <div className={styles.container}>
            <h1 className={styles.text}>Your cart is empty. Looks like you haven't added anything yet browse our shop and find something you'll love!</h1>
            <Link to='/shop' className={styles.shoppingBtn}>Continue Shopping</Link>
        </div>
    )
}