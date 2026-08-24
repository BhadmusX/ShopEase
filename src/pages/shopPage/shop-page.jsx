import { Navbar } from "../../components/navbar/navbar";
import Products from "../../components/products/products";
import { Footer } from "../../components/footer/footer";
import styles from '../shopPage/shopPage.module.css'
export default function ShopPage (){
    return(
        <div className={styles.appWrapper}>
             <Navbar/>
             <main className={styles.main}>
                 <Products/>
             </main>
        <Footer/>
        </div>
        
    )
}