import { Footer } from "../../components/footer/footer"
import { Navbar } from "../../components/navbar/navbar"
import WishItems from '../../components/wishItems/wishItems.jsx'
import styles from '../wishListPage/wishList.module.css';
import { useCart } from "../../hooks/useCart.jsx";
import { EmptyWish } from "../../components/emptyWishList/emptyWishList.jsx";
export default function WishList(){
    const {wishItems} = useCart();
    return(

        <div className={styles.appWrapper}>
            <div><Navbar/></div>
            <div className={styles.main}>
                {wishItems.length === 0 ? <EmptyWish/> : 
                 <div className={styles.container}>
                     <div className={styles.textContainer}>
                <h1 className={styles.headerText}>Your WishList</h1>
                <p className={styles.paraText}>Items you've saved for later.</p>
            </div>
                <WishItems/> 
                </div>
                }
            </div>

            <div><Footer/></div>
        </div>
    )
}