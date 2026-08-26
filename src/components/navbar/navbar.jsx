import { useCart } from "../../hooks/useCart";
import { NavLink } from "react-router";
import styles from '../navbar/navbar.module.css';
import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react"; 
import logo from "../../assert/shopease-logo.svg"
export const Navbar = () => {
    const {cartItems, wishItems} = useCart();
    const [isHamOpen, setHamOpen] = useState(false);

    const handleHam = () => {
        setHamOpen(!isHamOpen);
    }


   
    return(
        <div className={styles.navbarContainer}>
            <h1 className={styles.appname}>ShopEase</h1>

            <div className={styles.navContainer}>
                <div className={styles.navIcons}>
                    <NavLink to="/wishlist" className={styles.iconLink}>
                        <Heart size={23} className={styles.navIcon}/><span className={wishItems.length > 0 && styles.itemsLength}>{wishItems.length > 0 && wishItems.length}</span>
                    </NavLink>
                    <NavLink to="/cart" className={styles.iconLink}>
                        <ShoppingCart size={23} className={styles.navIcon}/><span className={cartItems.length > 0 && styles.itemsLength}>{cartItems.length > 0 && cartItems.length }</span>
                    </NavLink>
                </div>

                <div className={styles.hamburger} onClick={() => handleHam()}> 
                    <span className={styles.span}></span>
                    <span className={styles.span}></span>
                    <span className={styles.span}></span>
                </div>

                <div className={`${styles.nav} ${isHamOpen ? styles.activeNav : styles.Nav}`}>
                    <div className={styles.logoContainer}><img className={styles.logo}src={logo} alt="ShopEase" /></div>
                    <NavLink to="/" onClick={() => setHamOpen(false)} className={styles.navlink}>Home</NavLink>
                    <NavLink to='/shop' onClick={() => setHamOpen(false)} className={styles.navlink}>Shop</NavLink>
                </div>
            </div>



        </div>
    )
};