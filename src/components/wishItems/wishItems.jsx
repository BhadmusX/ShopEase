import { useCart } from "../../hooks/useCart";
import ProductCard from "../productCard/productCard.jsx";
import styles from '../wishItems/wishItems.module.css'
export default function WishItems(){

    const {wishItems} = useCart();
    return(
        <div className={styles.itemsContainer}>
            {wishItems.map((item) => <ProductCard product={item}/>)}
        </div>
    )
}