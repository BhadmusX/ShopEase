import { useCart } from "../../hooks/useCart";
import { NavLink } from "react-router";
import styles from '../navbar/navbar.module.css';
export const Navbar = () => {
    const {cartItems} = useCart();
   
    return(
        <div className={styles.navbarContainer}>
            <h1 className={styles.appname}>ShopEase</h1>
            <div className={styles.navlinks}>
                <NavLink to='/' className={({isActive}) => isActive ? styles.activeLink : styles.link} >Home</NavLink>
                <NavLink to='/shop' className={({isActive}) => isActive ? styles.activeLink : styles.link}>Shop</NavLink>
                <NavLink to='/cart' className={({isActive}) => isActive ? styles.activeLink : styles.link}>Cart {cartItems.length > 0 && <span className={styles.cartItems}>{cartItems.length}</span>}</NavLink>
            </div>
        </div>
    )
};