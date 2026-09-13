import { NavLink } from "react-router";
import styles from '../navbar/navbar.module.css';
import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react"; 
import logo from "../../assert/shopease-logo.svg"
import { useCart } from "../../hooks/useCart";
import useWish from "../../hooks/useWish";
export const Navbar = () => {
  
    const [isHamOpen, setHamOpen] = useState(false);

    const handleHam = () => {
        setHamOpen(!isHamOpen);
    }

    const {cartCount} = useCart();
    const {wishCount} = useWish();


   
    return(
        <div className={styles.navbarContainer}>
            <h1 className={styles.appname}>ShopEase</h1>

            <div className={styles.navContainer}>
                <div className={styles.navIcons}>
                    <NavLink to="/wishlist" className={styles.iconLink}>
                    <Heart size={25} className={styles.navIcon}/><span className={wishCount> 0 && styles.itemsLength}>{wishCount> 0 && wishCount}</span>
                    </NavLink>
                    <NavLink to="/cart" className={styles.iconLink}>
                        <ShoppingCart size={25} className={styles.navIcon}/><span className={cartCount > 0 && styles.itemsLength}>{cartCount > 0 && cartCount}</span>
                    </NavLink>
                </div>

                <div className={styles.hamburger} onClick={() => handleHam()}> 
                    <span className={styles.span}></span>
                    <span className={styles.span}></span>
                    <span className={styles.span}></span>
                </div>

                <div className={isHamOpen ? styles.activeOverlay : styles.overlay} onClick={() => setHamOpen(false)}>
                    <div className={`${styles.nav} ${isHamOpen ? styles.activeNav : styles.Nav}`}>
                    <div className={styles.logoContainer}><img className={styles.logo}src={logo} alt="ShopEase" /></div>
                    <NavLink to="/" onClick={() => setHamOpen(false)} className={styles.navlink}>Home</NavLink>
                    <NavLink to='/shop' onClick={() => setHamOpen(false)} className={styles.navlink}>Shop</NavLink>
                    </div>
                </div>  

            </div>



        </div>
    )
};