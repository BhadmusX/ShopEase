import { Navbar } from "../../components/navbar/navbar"
import { Footer } from "../../components/footer/footer"
import { useCart } from "../../hooks/useCart"
import { EmptyCart } from "../../components/emptyCart/emptyCart";
import { Cart } from "../../components/cart/cart";
import styles from '../cartPage/cartPage.module.css'
export function CartPage(){
    const {cartItems} = useCart();
    return(
          <div className={styles.appWrapper}>
            <Navbar/>
            <main className={styles.main}>
                 {cartItems.length === 0 ? <EmptyCart/> : <Cart/>
   
    }
            </main>
            <Footer/>
        </div>
    )
}