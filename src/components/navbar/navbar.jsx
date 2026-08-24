import { useCart } from "../../hooks/useCart";
import { Link } from "react-router";
import styles from '../navbar/navbar.module.css';
export const Navbar = () => {
    const {cartItems} = useCart();
   
    return(
        <div className={styles.navbarContainer}>
            <h1 className={styles.appname}>ShopEase</h1>
            <div className={styles.navlinks}>
                <Link to='/' className={styles.link}>Home</Link>
                <Link to='/shop' className={styles.link}>Shop</Link>
                <Link to='/cart' className={styles.link}>Cart {cartItems.length > 0 && <span className={styles.cartItems}>{cartItems.length}</span>}</Link>
            </div>
        </div>
    )
};