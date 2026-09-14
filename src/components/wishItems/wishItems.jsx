import { useCart } from "../../hooks/useCart.js";
import useWish from "../../hooks/useWish.jsx";
import ProductCard from "../productCard/productCard.jsx";
import styles from '../wishItems/wishItems.module.css'
export default function WishItems(){

    const {wishData, wisherror, wishloading} = useWish()
    return(
        <div className={styles.itemsContainer}>
            {console.log(wishData)}
            {wishData.map((item) => <ProductCard product={item}/>)}
        </div>
    )
}