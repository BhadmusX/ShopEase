import { Pencil, Trash, Star} from "lucide-react"
import { Link } from "react-router"
import styles from '../productCard/productCard.module.css';
const API_URL = import.meta.env.VITE_API_URL;


const ProductCard = ({product, removeproduct, toggleFeaturedProduct}) => {
    return(
        <>
                <div className={styles.productCard}>
                    <div className={styles.upperCard}>
                        <div className={styles.upperCardLeftContainer}>
                            <div className={styles.upperCardImgContainer}><img src={`${API_URL}/${product.imageUrl}`} className={styles.upperCardImg} alt={product.title} /></div>
                            <h1 className={styles.upperCardLeftText}>{product.title}</h1>
                        </div>

                        <div className={styles.upperCardRightContainer}>
                             <div className={styles.featureBtnContainer}>
                                <Star size={20} onClick={() => toggleFeaturedProduct(product.id)} className={product.isFeatured === true ? `${styles.featureBtn} ${styles.featured}` : `${styles.featureBtn}`}/>
                            </div>
                            <div className={styles.btnContainer}>
                                <Link to={`/admin/products/edit/${product.id}`}><Pencil size={20}/></Link> 
                            </div>
                            <div className={styles.delbtnContainer}>
                                <button className={styles.delBtn} onClick={() => removeproduct(product.id)}><Trash size={20}/></button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.lowerCard}>
                        <div className={styles.lowerCardLeft}>
                            <p className={styles.categoryLabel}>Category</p>
                            <h1 className={styles.categoryValue}>{product.category}</h1>
                        </div>

                        <div className={styles.lowerCardRight}>
                            <p className={styles.priceLabel}>Price</p>
                            <h1 className={styles.priceValue}>${product.price}</h1>
                        </div>
                    </div>
                </div>
    </>
    )
}
export default ProductCard;