import useWish from "../../hooks/useWish.jsx";
import ProductCard from "../productCard/productCard.jsx";
import styles from '../wishItems/wishItems.module.css'
export default function WishItems(){

    const {wishData} = useWish()
    return(
        <div className={styles.itemsContainer}>
            {console.log(wishData)}
            {wishData.map((item) => <ProductCard product={item}/>)}
        </div>
    )
}